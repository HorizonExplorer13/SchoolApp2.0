using Microsoft.EntityFrameworkCore;

namespace SchoolApp.Utilities
{
    public static class HttpContextExtension
    {
        public async static Task HeadersInsert<T>(this HttpContext httpContext, IQueryable<T> query)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }
            double Quantity = await query.CountAsync();
            httpContext.Response.Headers.Add("Total_registers", Quantity.ToString());
        }
    }
}
