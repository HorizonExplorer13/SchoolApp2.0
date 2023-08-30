using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.Entities;

namespace SchoolApp.Controllers
{
    [ApiController]
    [Route("api/AcademicReport")]
    public class AcademicReport : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public AcademicReport(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("GetReport")]
        public async Task<IActionResult> GetReport()
        {
            var report = await dbContext.ReportView.ToListAsync();
            if (report == null)
            {
                return NotFound();
            }

            return Ok(report);
        }     
    }
}
