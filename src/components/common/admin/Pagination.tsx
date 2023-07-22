import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const maxVisiblePages = 3; // Maximum number of visible pagination links

  const middleIndex = Math.ceil(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - middleIndex + 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center my-6 gap-2">
      <button
        disabled={currentPage === 1}
        className="flex items-center disabled:bg-white group p-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-full hover:bg-primary dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <IoIosArrowBack className="group-hover:text-white group-disabled:text-gray-300" />
      </button>

      <div className="items-center hidden lg:flex gap-x-3">
        {totalPages <= 10 ? (
          Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${
                index + 1 === currentPage && "text-blue-500 bg-blue-100/60"
              } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))
        ) : currentPage <= 5 ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  index + 1 === currentPage && "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <div>...</div>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  totalPages - 2 + index === currentPage &&
                  "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(totalPages - 2 + index)}
              >
                {totalPages - 2 + index}
              </button>
            ))}
          </>
        ) : currentPage >= totalPages - 5 ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  index + 1 === currentPage && "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <div>...</div>
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  totalPages - 5 + index === currentPage &&
                  "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(totalPages - 5 + index)}
              >
                {totalPages - 5 + index}
              </button>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  index + 1 === currentPage && "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <div>...</div>
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                className={`${
                  page === currentPage && "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <div>...</div>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`${
                  totalPages - 2 + index === currentPage &&
                  "text-blue-500 bg-blue-100/60"
                } px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-primary hover:bg-opacity-20`}
                onClick={() => setCurrentPage(totalPages - 3 + index)}
              >
                {totalPages - 2 + index}
              </button>
            ))}
          </>
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        className="flex items-center disabled:bg-white group p-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-full hover:bg-primary dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <IoIosArrowForward className="group-hover:text-white group-disabled:text-gray-400" />
      </button>
    </div>
  );
};

export default Pagination;
