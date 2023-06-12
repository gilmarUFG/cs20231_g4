namespace Biblioteca.Models
{
    public class LivroModel
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Autor { get; set; }
        public string? Editora { get; set; }
        public DateTime DataLancamento { get; set; }
        public int? UsuarioId { get; set; }
        public virtual UsuarioModel? Usuario { get; set; }
    }
}
