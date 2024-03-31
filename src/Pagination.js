import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ companiesPerPage, totalCompanies, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalCompanies / companiesPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5} 
        marginPagesDisplayed={2} 
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={"Previous"}
        nextLabel={"Next"}
      />
    </div>
  );
}

export default Pagination;
