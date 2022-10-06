import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResultsPagination = ({ results, navObj }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // declaration of variables
  // convert string to numbers
  const pageNo = parseInt(navObj.pageNo)
  const pageSize = parseInt(navObj.pageSize)
  // number of results
  const totalResults = results?.count;
  // page number array
  const pageNoArray = [];
  // maximum page number 7
  let pageNoArrayLength = 7;
  // max number of pages
  const maxPageNo = Math.ceil(results?.count / pageSize);

  // calculation of the page number if < 7
  if (maxPageNo < 7) {
    pageNoArrayLength = maxPageNo;
  }

  // to generate page number array in the length of 7 or less and make 7 the middle of the array if the array length > 7
  // declaration of variables
  const remainingPage = maxPageNo - pageNo;
  // button on the left
  let decreasePageNo = pageNo - 1;
  // button on the right
  let increasePageNo = pageNo + 1;

  // generating the page no array
  if (pageNo < 7) {
    for (let i = 0; i < pageNoArrayLength; i++) {
      pageNoArray.push(i + 1);
    }
  } else if (remainingPage < 3) {
    // button on the left
    for (let i = 0; i < 6 - remainingPage; i++) {
      pageNoArray.unshift(decreasePageNo);
      decreasePageNo -= 1;
    }
    // middle button
    pageNoArray.push(pageNo);
    // button on the right
    for (let i = 0; i < remainingPage; i++) {
      pageNoArray.push(increasePageNo);
      increasePageNo += 1;
    }
  } else {
    // button on the left
    for (let i = 0; i < 3; i++) {
      pageNoArray.unshift(decreasePageNo);
      decreasePageNo -= 1;
    }
    // middle button
    pageNoArray.push(pageNo);

    // button on the right
    for (let i = 0; i < 3; i++) {
      pageNoArray.push(increasePageNo);
      increasePageNo += 1;
    }
  }

  // calculate the number of results shown per page number and page size
  let firstNum = pageNo === 1 ? 1 : 1 + (pageNo - 1) * pageSize;
  let secondNum = pageNo !== maxPageNo ? firstNum - 1 + pageSize : totalResults;
  
  // function to change pageNo
  const handleSubmitPrev = () => {
    searchParams.set("pageNo", pageNo - 1)
    navigateToPage()
  }

  const handleSubmit = (event) => {
    searchParams.set("pageNo", event.target.value)
    navigateToPage()
  }
  const handleSubmitNext = () => {
    searchParams.set("pageNo", pageNo + 1)
    navigateToPage()
  }

  const navigateToPage = () => {
    // update the URL per location
    if (location.pathname.startsWith("/sets")) {
        navigate({ pathname: "/sets/search", search: "?" + searchParams.toString()});
    } else if (location.pathname.startsWith("/minifigures")) {
        navigate({ pathname: "/minifigures/search", search: "?" + searchParams.toString()});
    }
  }

  return (
    <>
      <div>showing {firstNum} of {secondNum} results</div>
      {pageNo === 1 ? null : <button onClick={handleSubmitPrev}>&#60;</button>}
      { maxPageNo === 1 ? null : pageNoArray.map((element, index) => (
        <div key={index}>
          <button onClick={handleSubmit} value={element}>{element}</button>
        </div>
      ))}
      {pageNo === maxPageNo ? null :<button onClick={handleSubmitNext}>&#62;</button>}
    </>
  );
};

export default SearchResultsPagination;
