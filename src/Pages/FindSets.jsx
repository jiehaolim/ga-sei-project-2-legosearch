import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import Results from "../Components/Results";
import Pagination from "../Components/Pagination";
import NoResultsFound from "../Components/NoResultsFound";
import { useEffect, useState } from "react";

const placeholderValue = "LEGO Sets...";
const API_KEY = import.meta.env.VITE_API_KEY;
const pageSize = 32;

const FindSets = () => {
  const [searchObj, setSearchObj] = useState({
    search: "",
    pageNo: 1,
  });
  const [results, setResults] = useState("");

  const searchInput = (searchTerm, pageNum) => {
    setSearchObj({ ...searchObj, search: searchTerm, pageNo: 1 });
  };

  const changePage = (nextPage) => {
    setSearchObj({ ...searchObj, pageNo: nextPage });
  };

  useEffect(() => {
    const fetchData = async (search) => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${searchObj.search}&page_size=${pageSize}&page=${searchObj.pageNo}`
      );
      const data = await response.json();
      setResults(data);
    };
    if (searchObj.search !== "") {
      fetchData(searchObj);
    }
  }, [searchObj]);

  return (
    <div>
      <NavBar />
      <SearchBar placeholderValue={placeholderValue} searchInput={searchInput}/>
      {results?.count === 0 ? (<NoResultsFound />) : searchObj.search !== "" ? (<Results results={results} />) : null}
      {results?.count === 0 ? null : results !== "" ? (<Pagination results={results} pageSize={pageSize} searchObj={searchObj} changePage={changePage}/>) : null}
    </div>
  );
};

export default FindSets;
