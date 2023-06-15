using Biblioteca.Data;
using Biblioteca.Helper;
using Biblioteca.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Biblioteca.Services
{
    public class LoginService
    {
        private readonly SistemaBibliotecaDBContext _sistemaBibliotecaDBContext;
        private readonly string jwtKey;

        public LoginService(SistemaBibliotecaDBContext sistemaBibliotecaDBContext, IConfiguration configuration)
        {
            _sistemaBibliotecaDBContext = sistemaBibliotecaDBContext;
            jwtKey = configuration["JwtSettings:Key"]!;
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            try
            {
                request.Senha = request?.Senha?.GerarHash();
                var usuario = await _sistemaBibliotecaDBContext.Usuarios.Where(u => u.Email == request.Email && u.Senha == request.Senha).SingleAsync();
                var response = new LoginResponse { Token = GenerateToken(usuario) };
                return response;
            }
            catch (Exception)
            {

                throw new Exception("Email ou senha inválidos");
            }
        }
        private string GenerateToken(UsuarioModel usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtKey);

            var claims = new List<Claim> {
                new("CargoUsuario", usuario.Cargo.ToString()),
                new(JwtRegisteredClaimNames.Email, usuario?.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "id.com",
                Audience = "livro.com",
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }
    }

}
