using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolApp.Entities
{
    public class Professors
    {
        [Key]
        public int ProfessorId {get; set;}
        [ForeignKey("Subjects")]
        public int SubjectId { get; set; }

        public Subjects Subjects { get; set; }
        [Required]
        public string Document { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Direction { get; set; }
        [Required]
        public string Phone { get; set; }

    }
}
