using System;
using System.Collections.Generic;

namespace ApiGestaoClinica.Models;

public partial class Pacientes
{
    public long Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Telefone { get; set; } = null!;

    public string Sexo { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Atendimentos> Atendimentos { get; set; } = new List<Atendimentos>();
}
