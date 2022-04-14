import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul
        className="pagination"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {pageNumbers.map((number) => (
          <li
            className="page-item"
            key={number}
            style={{
              margin: "0 0 0 10px",
              cursor: "pointer",
            }}
          >
            <a href="#" className="page-link" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
