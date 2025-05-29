using System;
using System.Collections.Generic;

namespace ApiGestaoClinica.Models;

public partial class Triagens
{
    public long Id { get; set; }

    public long AtendimentoId { get; set; }

    public string Sintomas { get; set; } = null!;

    public string PressaoArterial { get; set; } = null!;

    public decimal Peso { get; set; }

    public decimal Altura { get; set; }

    public int EspecialidadeId { get; set; }

    public virtual Atendimentos Atendimento { get; set; } = null!;
}
