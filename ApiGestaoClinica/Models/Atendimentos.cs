using System;
using System.Collections.Generic;

namespace ApiGestaoClinica.Models;

public partial class Atendimentos
{
    public long Id { get; set; }

    public long NumeroSequencial { get; set; }

    public long PacienteId { get; set; }

    public DateTime DataHoraChegada { get; set; }

    public int Status { get; set; }

    public virtual Pacientes Paciente { get; set; } = null!;

    public virtual ICollection<Triagens> Triagens { get; set; } = new List<Triagens>();
}
