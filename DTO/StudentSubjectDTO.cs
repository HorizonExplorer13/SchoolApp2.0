using SchoolApp.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolApp.DTO
{
    public class StudentSubjectDTO
    {
        [Required]
        public int Year { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        [Required]
        public float Grade { get; set; }
    }
}
