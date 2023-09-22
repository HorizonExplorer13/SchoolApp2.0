using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolApp.DTO;
using SchoolApp.Entities;
using SchoolApp.Utilities;

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
        [HttpGet("GetReport/{PageNumber}")]
        public async Task<IActionResult> GetReport(int PageNumber, [FromQuery] PaginationDTO pagination)
        {
            if (PageNumber != 0 && PageNumber != 1)
            {
                pagination.PageNumber = PageNumber;
            }
            else
            {
                pagination.PageNumber = 1;
            }
            var queryable = dbContext.ReportView.AsQueryable();
            await HttpContext.HeadersInsert(queryable);

            var report = await queryable.Pager(pagination).ToListAsync();
            var Totalitems = await dbContext.ReportView.CountAsync();
            var Totalpages = (int)Math.Ceiling((double)Totalitems / pagination.RowPerPage);
            HttpContext.Response.Headers.Add("Total-pages", Totalpages.ToString());

            if (report == null)
            {
                return NotFound();
            }

            //var Adddata = new
            //{
            //    totalPages = Totalpages
            //};

            //var reportCOM = new
            //{
            //    Report = report,
            //    AddData = Adddata
            //};

                return Ok(report);
            }     
    }
}
