namespace SchoolApp.DTO
{
    public class PaginationDTO
    {
        public int PageNumber { get; set; } = 0;
        private int RowsperPage { get; set; } = 1   ;
        private readonly int MaxRowsPerPage = 5;

        public int RowPerPage
        {
            get
            {
                return RowsperPage;
            }
            set
            {
                RowsperPage = (value > MaxRowsPerPage) ? MaxRowsPerPage : value;
            }
        }
    }
}
