using ApiGestaoClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGestaoClinica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriagensController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Triagens>>> GetTriagens(GestaoClinicaContext _context)
        {
            return await _context.Triagens.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Triagens>> GetTriagens(GestaoClinicaContext _context, long id)
        {
            var triagem = await _context.Triagens.FirstOrDefaultAsync(t => t.Id == id);

            if (triagem == null)
            {
                return NotFound();
            }

            return triagem;
        }

        [HttpPost]
        public async Task<ActionResult<Triagens>> PostTriagens(GestaoClinicaContext _context, Triagens triagem)
        {
            _context.Triagens.Add(triagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTriagens), new { id = triagem.Id }, triagem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTriagens(GestaoClinicaContext _context, long id, Triagens triagem)
        {
            if (id != triagem.Id)
            {
                return BadRequest();
            }

            _context.Entry(triagem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TriagensExists(_context, id))
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
        public async Task<IActionResult> DeleteTriagens(GestaoClinicaContext _context, long id)
        {
            var triagem = await _context.Triagens.FindAsync(id);
            if (triagem == null)
            {
                return NotFound();
            }

            _context.Triagens.Remove(triagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TriagensExists(GestaoClinicaContext _context, long id)
        {
            return _context.Triagens.Any(e => e.Id == id);
        }
    }
}
