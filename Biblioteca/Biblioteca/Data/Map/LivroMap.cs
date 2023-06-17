using Biblioteca.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Biblioteca.Data.Map
{
    public class LivroMap : IEntityTypeConfiguration<LivroModel>
    {
        public void Configure(EntityTypeBuilder<LivroModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Titulo).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Autor).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Editora).IsRequired().HasMaxLength(50);
            builder.Property(x => x.UsuarioId);
            builder.HasOne(x => x.Usuario);
        }
    }
}
