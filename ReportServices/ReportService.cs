using Microsoft.EntityFrameworkCore;
using SchoolApp.Entities;

namespace SchoolApp.ReportServices
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext dbContext;

        public ReportService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task UpdateReportAfterUpdate()
        {
            dbContext.reports.RemoveRange(dbContext.reports);
            await dbContext.SaveChangesAsync();


            var newReportData = await dbContext.studentSubjects
                .Join(dbContext.professors,
                    studentSubjects => studentSubjects.SubjectId,
                    professor => professor.SubjectId,
                    (studentSubjects, professor) => new Report
                    {
                        //Year = studentSubjects.Year,
                        //StudentDocument = studentSubjects.Students.Document,
                        //StudentName = studentSubjects.Students.Name,
                        //Code = studentSubjects.Subjects.Code,
                        //SubjectName = studentSubjects.Subjects.Name,
                        //ProfessorDocument = professor.Document,
                        //ProfessorName = professor.Name,
                        //Grade = studentSubjects.Grade,
                        //Aprobe = studentSubjects.Grade > 3.0 ? "yes" : "no"
                    })
                .ToListAsync();


            dbContext.reports.AddRange(newReportData);
            await dbContext.SaveChangesAsync();
        }
    }
}
