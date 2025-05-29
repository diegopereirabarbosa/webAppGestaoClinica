using System;
using System.Collections.Generic;

namespace ApiGestaoClinica.Models;

public partial class Especialidade
{
    public int Id { get; set; }

    public string NomeEspecialidade { get; set; } = null!;

    public virtual ICollection<Triagem> Triagem { get; set; } = new List<Triagem>();
}
