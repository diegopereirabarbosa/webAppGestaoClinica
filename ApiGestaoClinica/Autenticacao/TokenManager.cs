using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.Pkcs;
using System.Text;
using ApiGestaoClinica.Models;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ApiGestaoClinica.Autenticacao
{
    internal sealed class TokenManager : ITokenManager
    {
        private readonly IConfiguration _config;

        public TokenManager(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateToken(TbSimuladosCadastro tbSimuladosCadastro)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"] ?? string.Empty));

            // informações contidas no token (claimns)
            var claims = new List<Claim>()
            {
                new (JwtRegisteredClaimNames.Sub, tbSimuladosCadastro.Email), //sub colocamos informações do usuario
                new ("idSysUser", tbSimuladosCadastro.IdCadastro.ToString()), //sub colocamos informações do usuario
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), //identificador unico para aquele token que está sendo gerado
            };

            //tempo de experiacao do token
            var tempoExpiracaoInMinutes = jwtSettings.GetValue<int>("ExpirationTimeInMinutes");

            //montando nosso token
            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"), //quem emite
                audience: jwtSettings.GetValue<string>("Audience"), //quem consume
                claims: claims,

                expires: DateTime.UtcNow.AddMinutes(tempoExpiracaoInMinutes),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256));


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateTokenRefreshToken(TbSimuladosCadastro tbSimuladosCadastro)
        {
            var jwtSettings = _config.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"] ?? string.Empty));
            // informações contidas no token (claimns)
            var claims = new List<Claim>()
            {
                new (JwtRegisteredClaimNames.Sub, tbSimuladosCadastro.Email), //sub colocamos informações do usuario
                new ("idSysUser", tbSimuladosCadastro.IdCadastro.ToString()), //sub colocamos informações do usuario
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), //identificador unico para aquele token que está sendo gerado
            };
            //tempo de experiacao do token
            var tempoExpiracaoInMinutes = jwtSettings.GetValue<int>("RefreshExpirationTimeInMinutes");
            //montando nosso token
            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"), //quem emite
                audience: jwtSettings.GetValue<string>("Audience"), //quem consume
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(tempoExpiracaoInMinutes),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<(bool isValid, string? nomeLogin, int? idUsuario)> ValidateTokenAsync(string token)
        {
            MdeptvSimuladosContext _context = new MdeptvSimuladosContext();

            if (string.IsNullOrEmpty(token))
                return (false, null, null);

            var tokenParameters = TokenHelpers.GetTokenValidationParameters(_config);

            var validTokenResult = await new JwtSecurityTokenHandler().ValidateTokenAsync(token, tokenParameters);

            if (!validTokenResult.IsValid)

                return (false, null, null);

            var userName = validTokenResult.Claims.FirstOrDefault(c => c.Key == ClaimTypes.NameIdentifier).Value as string;

            var retorno = _context.TbSimuladosCadastro.AsNoTracking()
                .FirstOrDefault(a => a.Usuario == userName);


            return (true, userName, retorno.IdCadastro);


        }

    }
}

