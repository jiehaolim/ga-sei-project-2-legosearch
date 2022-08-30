import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SearchResultsNotFound from "../components/SearchResultsNotFound";
import NavBar from "../components-layout/NavBar";
import Pagination from "../components-layout/Pagination";


const API_KEY = import.meta.env.VITE_API_KEY;
const pageSize = 32;

const FindMinifigures = ({addItemToCollection}) => {
  const [searchObj, setSearchObj] = useState({
    search: "",
    pageNo: 1,
  });
  const [results, setResults] = useState("");

  const searchInput = (searchTerm) => {
    setSearchObj({ ...searchObj, search: searchTerm, pageNo: 1 });
  };

  const changePage = (nextPage) => {
    setSearchObj({ ...searchObj, pageNo: nextPage });
  };

  useEffect(() => {
    const fetchData = async (search) => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/?key=${API_KEY}&search=${searchObj.search}&page_size=${pageSize}&page=${searchObj.pageNo}`
      );
      const data = await response.json();
      setResults(data);
    };
    if (searchObj.search !== "") {
      fetchData(searchObj);
    }
  }, [searchObj]);

  const addDetailsToCollection = (item) => {
    addItemToCollection(item)
  }

  return (
    <div>
      <NavBar />
      <SearchBar searchInput={searchInput}/>
      {results?.count === 0 ? (<SearchResultsNotFound />) : searchObj.search !== "" ? (<SearchResults results={results} addDetailsToCollection={addDetailsToCollection} />) : null}
      {results?.count === 0 ? null : results !== "" ? (<Pagination results={results} pageSize={pageSize} searchObj={searchObj} changePage={changePage}/>) : null}
    </div>
  );
};

export default FindMinifigures;
