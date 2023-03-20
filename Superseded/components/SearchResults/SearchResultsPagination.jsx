import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResultsPagination = ({ resultsObj, navObj }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // declaration of variables
  const pagination = {
    pageNo: parseInt(navObj.pageNo), // convert string to numbers
    pageSize: parseInt(navObj.pageSize), // convert string to numbers
    totalResults: resultsObj?.count, // number of results
    get maxPageNo() {return Math.ceil(resultsObj?.count / this.pageSize)}, // max number of pages
    get pageNoArrayLength() {return this.maxPageNo < 7 ? this.maxPageNo : 7}, // calculation of the page number if < 7 else maximum page number 7
    pageNoArray: [], // page number array
    get remainingPage() {return this.maxPageNo - this.pageNo},
    get decreasePageNo() {return this.pageNo - 1}, // button on the left
    get increasePageNo() {return this.pageNo + 1}, // button on the right
    get firstNum() {return this.pageNo === 1 ? 1 : 1 + (this.pageNo - 1) * this.pageSize}, // calculate the number of results shown per page number and page size
    get secondNum() {return this.pageNo !== this.maxPageNo ? this.firstNum - 1 + this.pageSize : this.totalResults}, // calculate the number of results shown per page number and page size
  }
  
  // to generate page number array in the length of 7 or less and make 7 the middle of the array if the array length > 7
  // generating the page no array
  if (pagination.pageNo < 7) {
    for (let i = 0; i < pagination.pageNoArrayLength; i++) {
      pagination.pageNoArray.push(i + 1);
    }
  } else if (pagination.remainingPage < 3) {
    // button on the left
    for (let i = 0; i < 6 - pagination.remainingPage; i++) {
      pagination.pageNoArray.unshift(pagination.decreasePageNo);
      pagination.decreasePageNo -= 1;
    }
    // middle button
    pagination.pageNoArray.push(pageNo);
    // button on the right
    for (let i = 0; i < pagination.remainingPage; i++) {
      pagination.pageNoArray.push(pagination.increasePageNo);
      pagination.increasePageNo += 1;
    }
  } else {
    // button on the left
    for (let i = 0; i < 3; i++) {
      pagination.pageNoArray.unshift(pagination.decreasePageNo);
      pagination.decreasePageNo -= 1;
    }
    // middle button
    pagination.pageNoArray.push(pagination.pageNo);

    // button on the right
    for (let i = 0; i < 3; i++) {
      pagination.pageNoArray.push(pagination.increasePageNo);
      pagination.increasePageNo += 1;
    }
  }

  // function to change pageNo
  const handleSubmitPrev = () => {
    searchParams.set("pageNo", pagination.pageNo - 1)
    navigateToPage()
  }

  const handleSubmit = (event) => {
    searchParams.set("pageNo", event.target.value)
    navigateToPage()
  }
  const handleSubmitNext = () => {
    searchParams.set("pageNo", pagination.pageNo + 1)
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
      <div>showing {pagination.firstNum} of {pagination.secondNum} results</div>
      {pagination.pageNo === 1 ? null : <button onClick={handleSubmitPrev}>&#60;</button>}
      {pagination.maxPageNo === 1 ? null : pagination.pageNoArray.map((element, index) => (
        <div key={index}>
          <button onClick={handleSubmit} value={element}>{element}</button>
        </div>
      ))}
      {pagination.pageNo === pagination.maxPageNo ? null :<button onClick={handleSubmitNext}>&#62;</button>}
    </>
  );
};

export default SearchResultsPagination;
