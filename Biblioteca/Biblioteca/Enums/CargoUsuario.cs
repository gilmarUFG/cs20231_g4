using System.ComponentModel;

namespace Biblioteca.Enums
{
    public enum CargoUsuario
    {
        [Description("Cliente da biblioteca")]
        Cliente = 1,

        [Description("Funcionário da biblioteca")]
        Funcionario = 2
    }
}
