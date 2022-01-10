import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import queryString from "query-string";
import pickBy from "lodash/pickBy";
import isEmpty from "lodash/isEmpty";

const Pagination = ({ total, pageSize }) => {
  const router = useRouter();
  const [hasRouter, setHasRouter] = useState(false);
  useEffect(() => {
    setHasRouter(true);
  }, [router]);

  if (!hasRouter) return null;
  const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q));
  const currentPage = Number(query.page || 1);

  const isLastPage = currentPage * pageSize >= total;
  const pageNumbers = getPageNumbers({ currentPage, pageSize, total });

  const path = router.pathname;

  const url = (page) =>
    `?${queryString.stringify({
      ...query,
      page,
    })}`;

  return (
    <nav aria-label="pagination">
      <ul className="pagination">
        <li>
          {currentPage !== 1 ? (
            <NextLink href={url(currentPage - 1)} passHref prefetch={false}>
              <a label="Previous page">
                <i className="fas fa-chevron-left"></i>
              </a>
            </NextLink>
          ) : (
            <a label="No previous page available" disabled>
              <i className="fas fa-chevron-left"></i>
            </a>
          )}
        </li>
        {pageNumbers.map((pageNumber, i) =>
          pageNumber === "..." ? (
            <li key={`${pageNumber}${i}`} hellip>
              <a disabled label="ellipsis">
                &hellip;
              </a>
            </li>
          ) : (
            <li key={pageNumber}>
              {pageNumber === currentPage ? (
                <a
                  label={`Page ${pageNumber}, current page`}
                  className="current"
                >
                  {pageNumber}
                </a>
              ) : (
                <NextLink href={url(pageNumber)} passHref prefetch={false}>
                  <a label={`Page ${pageNumber}`}>{pageNumber}</a>
                </NextLink>
              )}
            </li>
          )
        )}
        <li>
          {!isLastPage ? (
            <NextLink href={url(currentPage + 1)} passHref prefetch={false}>
              <a label="Next page">
                <i className="fas fa-chevron-right"></i>
              </a>
            </NextLink>
          ) : (
            <a label="No next page available" disabled>
              <i className="fas fa-chevron-right"></i>
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

const getPageNumbers = ({
  currentPage,
  pageSize,
  total,
  pageNumbersToShow = 3,
}) => {
  const lastPageNumber = Math.ceil(total / pageSize);
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber;
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
  let startPage = 1;
  let endPage = lastPageNumber;

  if (lastPageNumber <= 1) {
    return []; // Don't show numbers if there's only 1 page
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    // near the start
    startPage = 1;
    endPage = pageNumbersToShow;
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
    // near the end
    startPage = lastPageNumber - pageNumbersToShow + 1;
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage;
    endPage = currentPageNumber + maxPagesAfterCurrentPage;
  }

  let pageNumbers = Array.from(Array(endPage + 1 - startPage).keys())
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0);

  if (pageNumbers[0] > 1) {
    if (pageNumbers[0] <= 2) {
      pageNumbers = [1, ...pageNumbers];
    } else {
      const ellipsis = pageNumbers[0] > 3 ? "..." : 2;
      pageNumbers = [1, ellipsis, ...pageNumbers];
    }
  }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
    if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
      pageNumbers = [...pageNumbers, lastPageNumber];
    } else {
      const ellipsis =
        pageNumbers[pageNumbers.length - 1] < lastPageNumber - 2
          ? "..."
          : lastPageNumber - 1;
      pageNumbers = [...pageNumbers, ellipsis, lastPageNumber];
    }
  }

  return pageNumbers;
};

export default Pagination;
