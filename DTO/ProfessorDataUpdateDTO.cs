using System.ComponentModel.DataAnnotations;

namespace SchoolApp.DTO
{
    public class ProfessorDataUpdateDTO
    {
        public int SubjectId { get; set; }

        public int Document { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Direction { get; set; }
        public string Phone { get; set; }
    }
}
