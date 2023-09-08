using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.DTO;
using SchoolApp.Entities;

namespace SchoolApp.Controllers
{
    [ApiController]
    [Route("api/subjectAssigner")]
    public class SubjectAssignerController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public SubjectAssignerController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("Assignlist")]
        public async Task<IActionResult> list()
        {
            var list = await dbContext.studentSubjects.Include(p => p.Students).Include(s => s.Subjects).ToListAsync();
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }   

            [HttpPost("Assign")]
            public async Task<IActionResult> AssignSubjects([FromBody] StudentSubjectDTO data)
            {
           
                var dataR = await dbContext.studentSubjects.FirstOrDefaultAsync(p => p.Year == data.Year && p.StudentId == data.StudentId && p.SubjectId == data.SubjectId);
                if (dataR == null) {
                    var Enrolled = new StudentSubjects
                    {
                        Year = data.Year,
                        StudentId = data.StudentId,
                        SubjectId = data.SubjectId,
                        Grade = data.Grade,
                    };
                
                    dbContext.studentSubjects.Add(Enrolled);
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                    {

                    return Ok(Enrolled);
                    
                    }
                BadRequest(result);
            }
                return Conflict("This student has already been assigned a subject this year");

            }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAssigned()
        {
            dbContext.studentSubjects.RemoveRange(dbContext.studentSubjects);
            var deleteresult = await dbContext.SaveChangesAsync();
            if (deleteresult != 0)
            {
                return Ok("the delete was succesfull");
            }
            return BadRequest("something was wrong");
        }

        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteByAssignedId(int Id)
        {
            var assign = await dbContext.studentSubjects.FindAsync(Id);
            if (assign == null)
            {
                return NotFound();
            }
            dbContext.studentSubjects.Remove(assign);
            var result = await dbContext.SaveChangesAsync();

            if (result != 0)
            {
                return Ok("the subject was succesfull delete");
            }
            return BadRequest();
        }         
      }
    }

