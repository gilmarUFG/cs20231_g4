namespace Biblioteca.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public string? Senha { get; set; }
        public DateOnly DataNascimento { get; set; }

        public int GetIdade()
        {
            int idade = DateTime.Now.Year - DataNascimento.Year;
            var dataAtual = DateTime.Now;

            if (DataNascimento.Month > dataAtual.Month || (DataNascimento.Month == dataAtual.Month && DataNascimento.Day > dataAtual.Day))
            {
                idade--;
            }

            return idade;
        }
    }
}
