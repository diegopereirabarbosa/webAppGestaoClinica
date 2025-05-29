using ApiGestaoClinica.Dtos;
using ApiGestaoClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGestaoClinica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendimentosController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AtendimentoDto>>> GetAtendimento(GestaoClinicaContext _context)
        {
            var atendimentos = await _context.Atendimentos
                .AsNoTracking()
                .Select(a => new AtendimentoDto
                {
                    Id = a.Id,
                    NumeroSequencial = a.NumeroSequencial,
                    PacienteId = a.PacienteId,
                    DataHoraChegada = a.DataHoraChegada,
                    Status = a.Status,
                    NomePaciente = a.Paciente.Nome
                })
                .ToListAsync();

            return atendimentos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Atendimentos>> GetAtendimento(GestaoClinicaContext _context, long id)
        {
            var atendimento = await _context.Atendimentos.FirstOrDefaultAsync(p => p.Id == id);

            if (atendimento == null)
            {
                return NotFound();
            }

            return atendimento;
        }

        [HttpPost]
        public async Task<ActionResult<Atendimentos>> PostAtendimento(GestaoClinicaContext _context, Atendimentos atendimento)
        {
            if (_context.Atendimentos.FirstOrDefault(a => a.PacienteId == atendimento.PacienteId && a.Status == 1) != null)
                return BadRequest("O Paciente já tem um atendimento em aberto!");

            atendimento.NumeroSequencial = GeraNumeroSequencial();
            atendimento.DataHoraChegada = DateTime.Now;

            _context.Atendimentos.Add(atendimento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAtendimento), new { id = atendimento.Id }, atendimento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> GetAtendimento(GestaoClinicaContext _context, long id, Atendimentos atendimento)
        {
            if (id != atendimento.Id)
            {
                return BadRequest();
            }

            _context.Entry(atendimento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AtendimentoExists(_context, id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool AtendimentoExists(GestaoClinicaContext _context, long id)
        {
            return _context.Atendimentos.Any(e => e.Id == id);
        }

        private long GeraNumeroSequencial()
        {
            using (var _context = new GestaoClinicaContext()) {
                return ((_context.Atendimentos.OrderByDescending(a => a.NumeroSequencial).FirstOrDefaultAsync())?.Result.NumeroSequencial ?? 0) + 1;
            }
           
        }
    }
}
