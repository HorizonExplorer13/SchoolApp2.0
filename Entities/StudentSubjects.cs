using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolApp.Entities
{
    public class StudentSubjects
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Year { get; set; }
        [ForeignKey("Students")]
        public int StudentId { get; set; }
        public Students Students { get; set; }
        [ForeignKey("Subjects")]
        public int SubjectId { get; set; }
        public Subjects Subjects { get; set; }
        [Required]
        public float Grade { get; set; }
        
    }
}
