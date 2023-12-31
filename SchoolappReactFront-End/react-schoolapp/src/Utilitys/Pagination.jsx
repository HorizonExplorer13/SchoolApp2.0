import React from "react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage == 1}
        >
          Previous
        </button>
        <div className="page-numbers">
          {pageNumbers.map((pageNumber) => (
            <span
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={currentPage == pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </span>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage == totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;