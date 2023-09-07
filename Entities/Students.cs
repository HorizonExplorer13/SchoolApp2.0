using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolApp.Entities
{
    public class Students
    {
        [Key]
        public int StudentId { get; set; }
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
