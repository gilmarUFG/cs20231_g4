namespace Biblioteca.Models
{
    public record LoginRequest
    {
        public string? Email { get; set; }
        public string? Senha { get; set; }
    }
}
