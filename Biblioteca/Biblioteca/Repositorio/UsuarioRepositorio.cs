using Biblioteca.Data;
using Biblioteca.Models;
using Biblioteca.Repositorio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Repositorio
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        private readonly SistemaBibliotecaDBContext _dbContext;
        public UsuarioRepositorio(SistemaBibliotecaDBContext sistemaBibliotecaDBContext)
        {
            _dbContext = sistemaBibliotecaDBContext;
        }
        public async Task<UsuarioModel> BuscarPorId(int id)
        {
            return await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<UsuarioModel>> BuscarTodosUsuarios()
        {
            return await _dbContext.Usuarios.ToListAsync();
        }
        public Task<UsuarioModel> Adicionar(UsuarioModel usuario)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioModel> Atualizar(UsuarioModel usuario, int id)
        {
            throw new NotImplementedException();
        }

        
    }
}
