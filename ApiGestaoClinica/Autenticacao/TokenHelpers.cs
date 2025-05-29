
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ApiGestaoClinica.Autenticacao
{
    public interface TokenHelpers
    {
        public static TokenValidationParameters GetTokenValidationParameters(IConfiguration configuration)
        {
            var tokenKey = Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"] ?? string.Empty);
            return new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                ValidateAudience = true,
                ValidAudience = configuration["JwtSettings:Audience"],
                ValidateIssuer = true,
                ValidIssuer = configuration["JwtSettings:Issuer"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(tokenKey)
            };
        }
    }
}
