using SchoolApp.DTO;

namespace SchoolApp.Utilities
{
    public static class IQueryableExtension
    {
        public static IQueryable<T> Pager<T>(this IQueryable<T> queryable, PaginationDTO pagination)
        {
            return queryable.Skip((pagination.PageNumber - 1) * pagination.RowPerPage).Take(pagination.RowPerPage);
        }
    }
}
