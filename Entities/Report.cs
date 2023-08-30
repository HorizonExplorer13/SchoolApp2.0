using System.ComponentModel.DataAnnotations;

namespace SchoolApp.Entities
{
    public class Report
    {
        [Key]
        public int ReportId { get; set; }

        public int StudentSubjectId { get; set; } 
        public StudentSubjects studentSubjects { get; set; }

        public int StudentId { get; set; }

        public Students Students { get; set; }

        public int SubjectId { get; set; }
        public Subjects Subjects { get; set; }

        public int ProfessorId { get; set; }
        public Professors Professors { get; set; }
        public string Aprobe { get; set; }

    }
}
