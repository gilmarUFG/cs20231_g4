using Biblioteca.Data;
using Biblioteca.Models;
using Biblioteca.Repositorio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Repositorio
{
    public class LivroRepositorio : ILivroRepositorio
    {
        private readonly SistemaBibliotecaDBContext _dbContext;
        public LivroRepositorio(SistemaBibliotecaDBContext sistemaBibliotecaDBContext)
        {
            _dbContext = sistemaBibliotecaDBContext;
        }
        public async Task<LivroModel> BuscarPorId(int id)
        {
            return await _dbContext.Livros
                .Include(x => x.Usuario)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<LivroModel>> BuscarTodosLivros()
        {
            return await _dbContext.Livros
                .Include(x => x.Usuario)
                .ToListAsync();
        }
        public async Task<LivroModel> Adicionar(LivroModel livro)
        {
            await _dbContext.Livros.AddAsync(livro);
            await _dbContext.SaveChangesAsync();
            return livro;
        }

        public async Task<bool> Apagar(int id)
        {
            LivroModel livroPorId = await BuscarPorId(id);
            if (livroPorId == null)
            {
                throw new Exception($"Livro para o id {id} não foi encontrado");
            }
            _dbContext.Livros.Remove(livroPorId);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<LivroModel> Atualizar(LivroModel livro, int id)
        {
            LivroModel livroPorId = await BuscarPorId(id);
            if(livroPorId == null)
            {
                throw new Exception($"Livro para o id {id} não foi encontrado");
            }
            livroPorId.Autor = livro.Autor;
            livroPorId.Editora = livro.Editora;
            livroPorId.Titulo = livro.Titulo;
            livroPorId.DataLancamento = livro.DataLancamento;
            livroPorId.UsuarioId = livro.UsuarioId;
            

            _dbContext.Livros.Update(livroPorId);
            await _dbContext.SaveChangesAsync();
            return livroPorId;
        }
        public async Task<LivroModel> Alugar(int id, int idUsuario)
        {
            LivroModel livroPorId = await BuscarPorId(id);
            if (livroPorId == null)
            {
                throw new Exception($"Livro para o id {id} não foi encontrado");
            }
            if(livroPorId.UsuarioId != null)
                throw new Exception($"Livro para o id {id} já se encontra alugado no momento");
            livroPorId.UsuarioId = idUsuario;
            _dbContext.Livros.Update(livroPorId);
            await _dbContext.SaveChangesAsync();
            return livroPorId;
        }
        public async Task<LivroModel> Devolver(int id, int idUsuario)
        {
            LivroModel livroPorId = await BuscarPorId(id);
            if (livroPorId == null)
            {
                throw new Exception($"Livro para o id {id} não foi encontrado");
            }
            if (livroPorId.UsuarioId == null)
                throw new Exception($"Livro para o id {id} não se encontra alugado para ser devolvido");
            livroPorId.UsuarioId = null;
            _dbContext.Livros.Update(livroPorId);
            await _dbContext.SaveChangesAsync();
            return livroPorId;
        }


    }
}
