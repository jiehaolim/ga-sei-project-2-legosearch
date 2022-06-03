import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Pagination = ({ results, pageSize, searchObj, changePage }) => {
  // number of results
  const dataArray = results?.count;
  
  // creating array of page numbers
  let pageArray = [];
  let maxPageNo = Math.ceil(results?.count / pageSize);
  let pageNoLength = 0;

  // calculate the number of items shown per page number
  let firstNum = searchObj.pageNo === 1 ? 1 : 1 + ((searchObj.pageNo - 1) * pageSize);
  let secondNum = searchObj.pageNo !== maxPageNo ? firstNum - 1 + pageSize : dataArray;

  // setting the page number length
  if (maxPageNo >= 7) {
    pageNoLength = 7;
  } else {
    pageNoLength = Math.ceil(results?.count / pageSize);
  }

  // to generate page number array in the length of 7 or less and make 7 the middle of the array if the array length > 7
  let remainingPage = maxPageNo - searchObj.pageNo;
  let decreasePageNo = searchObj.pageNo - 1;
  let increasePageNo = searchObj.pageNo + 1;

  if (searchObj.pageNo < 7) {
    for (let i = 0; i < pageNoLength; i++) {
      pageArray.push(i + 1);
    }
  } else if (remainingPage < 3) {
    for (let i = 0; i < 6 - remainingPage; i++) {
      pageArray.unshift(decreasePageNo);
      decreasePageNo -= 1;
    }
    pageArray.push(searchObj.pageNo);

    for (let i = 0; i < remainingPage; i++) {
      pageArray.push(increasePageNo);
      increasePageNo += 1;
    }
  } else {
    for (let i = 0; i < 3; i++) {
      pageArray.unshift(decreasePageNo);
      decreasePageNo -= 1;
    }
    pageArray.push(searchObj.pageNo);

    for (let i = 0; i < 3; i++) {
      pageArray.push(increasePageNo);
      increasePageNo += 1;
    }
  }

  // Callback function to uplift the state
  const handleClick = (event) => {
    changePage(event);
  };

  const handlePrev = () => {
    changePage(searchObj.pageNo - 1);
  };

  const handleNext = () => {
    changePage(searchObj.pageNo + 1);
  };

  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstNum}</span> to {" "}
            <span className="font-medium">{secondNum}</span> of{" "}
            <span className="font-medium">{dataArray}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              className={
                maxPageNo === 1 || searchObj.pageNo === 1
                  ? "hidden"
                  : "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => handlePrev()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className={maxPageNo === 1 ? "hidden" : "h-5 w-5"}
                aria-hidden="true"
              />
            </a>
            {pageArray.map((element) => (
              <a
                key={element}
                className={
                  maxPageNo === 1
                    ? "hidden"
                    : searchObj.pageNo === element
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
                aria-current={searchObj.pageNo === element ? "page" : undefined}
                onClick={() => handleClick(element)}
              >
                {element}
              </a>
            ))}
            <a
              className={
                maxPageNo === 1 || maxPageNo === searchObj.pageNo
                  ? "hidden"
                  : "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => handleNext()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className={maxPageNo === 1 ? "hidden" : "h-5 w-5"}
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
