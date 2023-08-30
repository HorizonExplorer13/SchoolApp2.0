using System.ComponentModel.DataAnnotations;

namespace SchoolApp.DTO
{
    public class SubjectDataCreationDTO
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
