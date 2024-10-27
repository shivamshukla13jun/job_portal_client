import React from "react";

const usePagination = ({ totalItems, perPage = 9, currentPage = 1, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / perPage);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPageIndex = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPageIndex = Math.min(pageCount, currentPage + halfMaxVisiblePages);

    if (endPageIndex - startPageIndex < maxVisiblePages - 1) {
      if (startPageIndex === 1) {
        endPageIndex = Math.min(pageCount, startPageIndex + maxVisiblePages - 1);
      } else {
        startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`ls-page-item ${currentPage === i ? "current-page" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          <a href="#">{i}</a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
          <a href="#" onClick={() => handlePageClick(Math.max(1, currentPage - 1))}>
            <i className="fa fa-arrow-left"></i>
          </a>
        </li>
        {renderPageNumbers()}
        <li className={`next ${currentPage === pageCount ? "disabled" : ""}`}>
          <a href="#" onClick={() => handlePageClick(Math.min(pageCount, currentPage + 1))}>
            <i className="fa fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default usePagination;
