using Biblioteca.Enums;
using Biblioteca.Helper;

namespace Biblioteca.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public string? Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public CargoUsuario Cargo { get; set; }

        public void SetSenhaHash()
        {
            Senha = Senha?.GerarHash();
        }
    }
}
