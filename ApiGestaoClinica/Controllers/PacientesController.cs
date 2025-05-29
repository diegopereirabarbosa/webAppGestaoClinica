using ApiGestaoClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGestaoClinica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pacientes>>> GetPacientes(GestaoClinicaContext _context)
        {
            return await _context.Pacientes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pacientes>> GetPaciente(GestaoClinicaContext _context, long id)
        {
            var paciente = await _context.Pacientes.Include(p => p.Atendimentos).FirstOrDefaultAsync(p => p.Id == id);

            if (paciente == null)
            {
                return NotFound();
            }

            return paciente;
        }

        [HttpPost]
        public async Task<ActionResult<Pacientes>> PostPaciente(GestaoClinicaContext _context, Pacientes paciente)
        {
            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPaciente), new { id = paciente.Id }, paciente);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(GestaoClinicaContext _context, long id, Pacientes paciente)
        {
            if (id != paciente.Id)
            {
                return BadRequest();
            }

            _context.Entry(paciente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacienteExists(_context, id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(GestaoClinicaContext _context, long id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            _context.Pacientes.Remove(paciente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PacienteExists(GestaoClinicaContext _context, long id)
        {
            return _context.Pacientes.Any(e => e.Id == id);
        }
    }
}
