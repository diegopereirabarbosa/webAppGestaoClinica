namespace ApiGestaoClinica.Dtos
{
    public class AtendimentoDto
    {
        public long Id { get; set; }
        public long NumeroSequencial { get; set; }
        public long PacienteId { get; set; }
        public DateTime DataHoraChegada { get; set; }
        public int Status { get; set; }
        public string NomePaciente { get; set; } = null!;
    }
}
