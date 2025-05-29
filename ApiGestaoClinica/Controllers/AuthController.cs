using Amazon;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApiPerfilSimuladoV6.Autenticacao;
using WebApiPerfilSimuladoV6.Models;
using WebApiPerfilSimuladoV6.Models.CustomModels;

namespace ApiGestaoClinica.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {

        private readonly ITokenManager _tokenManager;

        public AuthController(ITokenManager tokenManager)
        {
            _tokenManager = tokenManager;
        }

         [HttpPost]
       [Route("Login")]
       public ActionResult Login([FromServices] MdeptvSimuladosContext _context, TbSimuladosCadastro tbSimuladosCadastro)
       {
           if (tbSimuladosCadastro == null)
               return NotFound();
      
           try
           {
               if (string.IsNullOrWhiteSpace(tbSimuladosCadastro.Email) || string.IsNullOrWhiteSpace(tbSimuladosCadastro.Senha))
               {
                   return BadRequest(new { errors = new string[] { "Necessário informar login e senha." } });
               }
      
               // Busca o usuário
               var usuario = _context.TbSimuladosCadastro
                   .FirstOrDefault(a => a.Usuario == tbSimuladosCadastro.Email);
      
               // Verifica se encontrou e se a senha bate
               if (usuario == null || !BCrypt.Net.BCrypt.Verify(tbSimuladosCadastro.Senha, usuario.Senha))
               {
                   return NotFound(new { errors = new string[] { "Login ou senha inválidos" } });
               }
      
               var token = _tokenManager.GenerateToken(usuario);
               var refreshToken = _tokenManager.GenerateTokenRefreshToken(usuario);
      
      
               var retorno = new
               {
                   usuario.Email,
                   usuario.IdCadastro,
                   usuario.Nome,
                   usuario.FotoPerfil,
                   token = token,
                   refreshToken = refreshToken,
               };
               return Ok(retorno);
           }
           catch (Exception)
           {
               return StatusCode(500, new { errors = new string[] { "Erro ao processar a requisição" } });
           }
       }
    }
  }
