using System.ComponentModel.DataAnnotations;

namespace SchoolApp.Entities
{
    public class Subjects
    {
        [Key]
        public int SubjectId { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }

    }
}
