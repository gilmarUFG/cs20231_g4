using Biblioteca.Models;

namespace Biblioteca.Repositorio.Interfaces
{
    public interface ILivroRepositorio
    {
        Task<List<LivroModel>> BuscarTodosLivros();
        Task<LivroModel> BuscarPorId(int id);
        Task<LivroModel> Adicionar(LivroModel livro);
        Task<LivroModel> Atualizar(LivroModel livro, int id);
        Task<bool> Apagar(int id);
        Task<LivroModel> Alugar(int id, int idUsuario);
        Task<LivroModel> Devolver(int id, int idUsuario);

    }
}
