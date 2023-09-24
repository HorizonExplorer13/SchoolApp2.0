using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.DTO;
using SchoolApp.Entities;
using SchoolApp.ReportServices;

namespace SchoolApp.Controllers
{
    [ApiController]
    [Route("api/Subjects")]
    public class SubjectController :ControllerBase
    {
        private readonly AppDbContext dbContext;

        public SubjectController(AppDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        [HttpGet("Getlist")]
        public async Task<IActionResult> Getlist()
        {
            var Subjectlist = await dbContext.subjects.ToListAsync();
            if (Subjectlist != null)
            {
                return Ok(Subjectlist);
            }
            return BadRequest();
        }

        [HttpGet("GetById/{subjectId}")]
        public async Task<IActionResult> GetById(int subjectId)
        {
            var subject = await dbContext.subjects.FirstOrDefaultAsync(x => x.SubjectId == subjectId);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateSubject([FromBody] SubjectDataCreationDTO subject)
        {
            var subjects = await dbContext.subjects.FirstOrDefaultAsync(p => p.Code == subject.Code && p.Name == subject.Name);
            if (subjects == null)
            {  
                var Subjectdata = new Subjects
                {
                    Code = subject.Code,
                    Name = subject.Name,
                };
                dbContext.subjects.Add(Subjectdata);
                var result = await dbContext.SaveChangesAsync();
                if (result is 0)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            return BadRequest("this subject already exist");
        }
     

        [HttpPut("Update/{subjectId}")]
        public async Task<IActionResult> UpdateSubject(int subjectId, [FromBody] SubjectDataUpdateDTO Subject)
        {
            var subjects = await dbContext.subjects.FirstOrDefaultAsync(p => p.Code == Subject.Code && p.Name == Subject.Name);
            if (subjects == null)
            {
                var subject = await dbContext.subjects.FindAsync(subjectId);
                if (subject == null)
                {
                    return NotFound(subjectId);
                }
                subject.Code = Subject.Code;
                subject.Name = Subject.Name;

                dbContext.Entry(subject).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync();
                if (result != 0)
                {
                    return Ok(subject);
                }
                return BadRequest();
            }
            return BadRequest("there is already a subject with this info");
        
        }
        [HttpDelete("Delete/{subjectId}")]
        public async Task<IActionResult> DeleteSubject(int subjectId)
        {
            var subject = await dbContext.subjects.FindAsync(subjectId);

            if(subject == null)
            {
                NotFound(subjectId);
            }
            dbContext.subjects.Remove(subject);
            var result = await dbContext.SaveChangesAsync();
            if(result != 0)
            {
                return Ok("the subject was succesfull delete");
            }
            return BadRequest();
        }
    }
}
