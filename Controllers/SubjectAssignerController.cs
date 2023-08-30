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
            var list = await dbContext.studentSubjects.ToListAsync();
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
                return BadRequest("This student has already been assigned a subject this year");

            }

        [HttpPut]
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


        //private async Task PostInReport()
        //{
        //    var reportdata = await dbContext.studentSubjects.Join(dbContext.professors,
        //        studentSubjects => studentSubjects.SubjectId,
        //        proffesor => proffesor.SubjectId,
        //        (studentSubjects,proffesor)=>new Report
        //        {
        //            //Year = studentSubjects.Year,
        //            //StudentDocument = studentSubjects.Students.Document,
        //            //StudentName =studentSubjects.Students.Name,
        //            //Code=studentSubjects.Subjects.Code,
        //            //SubjectName=studentSubjects.Subjects.Name,
        //            //ProfessorDocument=proffesor.Document,
        //            //ProfessorName=proffesor.Name,
        //            //Grade=studentSubjects.Grade,
        //            //Aprobe = studentSubjects.Grade > 3.0? "yes":"no"
                    
        //        }).ToListAsync();
        //    foreach (var report in reportdata)
        //    {
        //        dbContext.reports.Add(report);
        //    }
        //    var result = await dbContext.SaveChangesAsync();
        //    if (result != null)
        //    {
        //        Console.WriteLine("report succesfuly create");
        //    }
        //    Console.WriteLine("there was an error");
           
         
        }

            

    }

