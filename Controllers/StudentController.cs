using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.DTO;
using SchoolApp.Entities;

namespace SchoolApp.Controllers
{
    [ApiController]
    [Route("api/Students")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public StudentController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("Getlist")]
        public async Task<IActionResult> Getlist()
        {
            var Studentlist = await dbContext.students.ToListAsync();
            if (Studentlist == null)
            {
                return NotFound();
            }
            return Ok(Studentlist);
        }
        [HttpGet("GetById/{studentId}")]
        public async Task<IActionResult> GetById(int studentId)
        {
            var student = await dbContext.students.FirstOrDefaultAsync(x => x.StudentId == studentId);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [HttpPost("Create")]
        public async Task<IActionResult> CreateStundent([FromBody] StudentDataCreation student)
        {
            var Student = await dbContext.students.FirstOrDefaultAsync(p => p.Name == student.Name && p.Surname == student.Surname);
            if (Student == null)
            {
                var newstudent = new Students
                {
                    Document = student.Document,
                    Name = student.Name,
                    Surname = student.Surname,
                    Age = student.Age,
                    Direction = student.Direction,
                    Phone = student.Phone,
                };

                dbContext.students.Add(newstudent);
                var result = await dbContext.SaveChangesAsync();
                if (result == 0)
                {
                    return BadRequest(result);
                }
                return Ok(newstudent);
            }
            return BadRequest("there is already a stundent with this info");

        }
        [HttpPut("Update/{studentId}")]
        public async Task<IActionResult> UpdateStudent(int studentId, [FromBody] StudentDataUpdateDTO updateDTO)
        {
            //var Student = await dbContext.students.FirstOrDefaultAsync(p => p.Name == updateDTO.Name && p.Surname == updateDTO.Surname);
            //if (Student == null)
            //{
                var student = await dbContext.students.FindAsync(studentId);
                if (student == null)
                {
                    return NotFound();
                }
                student.Document = updateDTO.Document;
                student.Name = updateDTO.Name;
                student.Surname = updateDTO.Surname;
                student.Age = updateDTO.Age;
                student.Direction = updateDTO.Direction;
                student.Phone = updateDTO.Phone;

                dbContext.Entry(student).State = EntityState.Modified;
                var result = await dbContext.SaveChangesAsync();
                if (result != 0)
                {
                    return Ok(student);
                }
                return BadRequest();
            //}
            //return BadRequest("There is already a student with this info ");

        }

        [HttpDelete("Delete/{studentId}")]
        public async Task<IActionResult> Deletestudent(int studentId)
        {
            var Enrolledstudent = await dbContext.studentSubjects.FirstOrDefaultAsync(p => p.StudentId == studentId);
            {
                if (Enrolledstudent == null)
                {
                    var student = await dbContext.students.FindAsync(studentId);
                    if (student == null)
                    {
                        return NotFound();
                    }
                    dbContext.students.Remove(student);
                    var result = await dbContext.SaveChangesAsync();
                    if (result != 0)
                    {
                        return Ok("the subject was succesfull delete");
                    }
                    return BadRequest();

                }
                return BadRequest("This student has already relate one or more subject, pls firts remove the assigned");
            }

        }
    }
}   