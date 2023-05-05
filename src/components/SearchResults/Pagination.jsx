import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ resultsObj }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("pageNo") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "20";
  const lastPageNo = Math.ceil(resultsObj?.count / pageSize).toString();

  // computation of number of results
  const startNumResults =
    pageNo === "1" ? 1 : 1 + parseInt(pageSize) * (parseInt(pageNo) - 1);
  const endNumResults =
    lastPageNo === pageNo
      ? resultsObj?.count
      : resultsObj?.results.length * parseInt(pageNo);

  // computation of the page number array
  const paginationButtonLength = 7;
  const pageNumArray = [];
  // function to generate page no
  const generatePageNo = (startingPageNum, arrayLength) => {
    for (let i = 0; i < arrayLength; i++) {
      pageNumArray.push(i + startingPageNum);
    }
  };
  let startingNum = 0;
  let endingNum = 0;
  // pages > 7
  if (parseInt(lastPageNo) > 7) {
    // current page number starts at the middle
    if (
      parseInt(pageNo) - 3 > 0 &&
      parseInt(pageNo) + 3 < parseInt(lastPageNo)
    ) {
      startingNum = parseInt(pageNo) - 3;
      endingNum = paginationButtonLength;
      // current page going to reach the end
    } else if (parseInt(pageNo) + 3 >= parseInt(lastPageNo)) {
      startingNum = parseInt(lastPageNo) - 6;
      endingNum = paginationButtonLength;
    } else {
      // current page at the start
      startingNum = 1;
      endingNum = paginationButtonLength;
    }
    // page < 7
  } else {
    startingNum = 1;
    endingNum = parseInt(lastPageNo);
  }
  generatePageNo(startingNum, endingNum);

  // handlePageChange
  const handleChange = (value) => {
    if (value === "previous") {
      searchParams.set("pageNo", parseInt(pageNo) - 1);
    } else if (value === "next") {
      searchParams.set("pageNo", parseInt(pageNo) + 1);
    } else {
      searchParams.set("pageNo", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="mt-8 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-t border-gray-300 py-3">
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {startNumResults.toLocaleString()}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {endNumResults.toLocaleString()}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {resultsObj?.count?.toLocaleString()}
              </span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="bg-white isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {pageNo === "1" && lastPageNo === "1" ? (
                <></>
              ) : pageNo === "1" ? (
                <>
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => handleChange("next")}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : pageNo === lastPageNo ? (
                <>
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => handleChange("previous")}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => handleChange("previous")}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => handleChange("next")}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {startNumResults.toLocaleString()}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {endNumResults.toLocaleString()}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {resultsObj?.count?.toLocaleString()}
              </span>{" "}
              results
            </p>
          </div>

          <div>
            <nav
              className="bg-white isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {pageNo === "1" && lastPageNo === "1" ? (
                <></>
              ) : pageNo === "1" ? (
                <>
                  {pageNumArray.map((pageNum, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleChange(pageNum)}
                      className={
                        index === 0 && pageNum === parseInt(pageNo)
                          ? "relative z-10 inline-flex items-center rounded-l-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : pageNum === parseInt(pageNo)
                          ? "relative z-10 inline-flex items-center  bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleChange("next")}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : pageNo === lastPageNo ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleChange("previous")}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {pageNumArray.map((pageNum, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleChange(pageNum)}
                      className={
                        index === pageNumArray.length - 1 &&
                        pageNum === parseInt(pageNo)
                          ? "relative z-10 inline-flex items-center rounded-r-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : pageNum === parseInt(pageNo)
                          ? "relative z-10 inline-flex items-center  bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleChange("previous")}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {pageNumArray.map((pageNum, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleChange(pageNum)}
                      className={
                        pageNum === parseInt(pageNo)
                          ? "relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleChange("next")}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
