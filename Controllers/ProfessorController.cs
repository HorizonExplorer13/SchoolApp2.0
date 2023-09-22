using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.DTO;
using SchoolApp.Entities;

namespace SchoolApp.Controllers
{
    [ApiController]
    [Route("api/professors")]
    public class ProfessorController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public ProfessorController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("Getlist")]
        public async Task<IActionResult> Getlist()
        {
            var Studentlist = await dbContext.professors.Include(p=>p.Subjects).ToListAsync();
            if (Studentlist == null)
            {
                return NotFound();
            }
            return Ok(Studentlist);
        }
        [HttpGet("GetById/{professorId}")]
        public async Task<IActionResult> GetbyId(int professorId)
        {
            var Professor = await dbContext.professors.Include(p=>p.Subjects).FirstOrDefaultAsync(x => x.ProfessorId == professorId);
            if (Professor == null)
            {
                return NotFound();
            }
            return Ok(Professor);
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateProfessors([FromBody] ProfessorDataCreationDTO professor)
        {
            var Professor = await dbContext.professors.FirstOrDefaultAsync(p=> p.Document == professor.Document && p.Name == professor.Name && p.Surname == professor.Surname && p.SubjectId == professor.SubjectId);
            if (Professor == null)
            {
                var newproffesor = new Professors
                {
                    
                    Document = professor.Document,
                    Name = professor.Name,
                    Surname = professor.Surname,
                    Age = professor.Age,
                    Direction = professor.Direction,
                    Phone = professor.Phone,
                    SubjectId = professor.SubjectId,
                };

                dbContext.professors.Add(newproffesor);
                var result = await dbContext.SaveChangesAsync();
                if (result == 0)
                {
                    return BadRequest(result);
                }
                return Ok(newproffesor);
            }
            return Conflict("there is already a professor with this info");
            
        }
        [HttpPut("Update/{professorId}")]
        public async Task <IActionResult> Updateprofessor(int professorId, [FromBody] ProfessorDataUpdateDTO updateDTO)
        {
            //var professor = await dbContext.professors.FirstOrDefaultAsync(p=> p.Name == updateDTO.Name && p.Surname == updateDTO.Surname);
            //if (professor == null) {
                var proffessor = await dbContext.professors.FindAsync(professorId);
                if (proffessor == null)
                {
                    return NotFound();
                }
                proffessor.SubjectId = updateDTO.SubjectId;
                proffessor.Document = updateDTO.Document;
                proffessor.Name = updateDTO.Name;
                proffessor.Surname = updateDTO.Surname;
                proffessor.Age = updateDTO.Age;
                proffessor.Direction = updateDTO.Direction;
                proffessor.Phone = updateDTO.Phone;

                dbContext.Entry(proffessor).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync();
                if (result != 0)
                {
                    return Ok(proffessor);
                }
                return BadRequest();
            //}
            //return BadRequest("there is already a professor with this info");
        }
        [HttpDelete("Delete/{professorId}")]
        public async Task<IActionResult> Delete(int professorId)
        {        
                    var Professor = await dbContext.professors.FindAsync(professorId);
                    if (Professor == null)
                    {
                        return NotFound();
                    }
                    dbContext.professors.Remove(Professor);
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                    {
                        return Ok("the subject was succesfull delete");
                    }
                    return BadRequest();
            }
        }
    }

        
