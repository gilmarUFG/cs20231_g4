using Biblioteca.Enums;

namespace Biblioteca.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public string? Senha { get; set; }
        public DateOnly DataNascimento { get; set; }
        public CargoUsuario Cargo { get; set; }
    }
}
