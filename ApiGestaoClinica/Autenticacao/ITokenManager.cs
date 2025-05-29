using ApiGestaoClinica.Models;

namespace ApiGestaoClinica.Autenticacao
{
    public interface ITokenManager
    {
        string GenerateToken(TbSimuladosCadastro tbSimuladosCadastro);

        string GenerateTokenRefreshToken(TbSimuladosCadastro tbSimuladosCadastro);

        Task<(bool isValid, string? nomeLogin, int? idUsuario)> ValidateTokenAsync(string token);
    }
}
