import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useOutletContext } from "react-router-dom";
import SearchNavGrp from "../../components/SearchResults/SearchNavGrp";
import SearchResults from "../../components/SearchResults/SearchResults";
import SearchResultsPagination from "../../components/SearchResults/SearchResultsPagination"
const API_KEY = import.meta.env.VITE_API_KEY;

const SetsSearchResults = ({ addToWishlist }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultsObj, setResultsObj] = useState({ results: [] });
  const navigate = useNavigate()
  const [themes, setThemes] = useOutletContext()
  
  // obtain the search params from original search
  const searchObj = {
    term: searchParams.get("term"),
    theme: searchParams.get("theme"),
    minYear: searchParams.get("minYear") === null ? searchParams.get("year") : searchParams.get("minYear"),
    maxYear: searchParams.get("maxYear") === null ? searchParams.get("year") : searchParams.get("maxYear"),
    minParts: searchParams.get("minParts") === null ? "" : searchParams.get("minParts"),
    maxParts: searchParams.get("maxParts") === null ? "" : searchParams.get("maxParts"),
  }

  // obtain additional search params from sorting
  const navObj = {
    sortOrdering: searchParams.get("sortOrdering") === null ? "set_num" : searchParams.get("sortOrdering"), // name, set_num, year, num_parts
    sortBy: searchParams.get("sortBy") === null ? "" : searchParams.get("sortBy"), // asc is "", dsc is -
    pageSize: searchParams.get("pageSize") === null ? 20 : searchParams.get("pageSize"),
    pageNo: searchParams.get("pageNo") === null ? 1 : searchParams.get("pageNo")
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${searchObj.term}&theme_id=${searchObj.theme}&min_year=${searchObj.minYear}&max_year=${searchObj.maxYear}&min_parts=${searchObj.minParts}&max_parts=${searchObj.maxParts}&ordering=${
          navObj.sortBy}${navObj.sortOrdering}&page_size=${navObj.pageSize}&page=${navObj.pageNo}`
      );
      const data = await response.json();
      setResultsObj(data);
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <SearchNavGrp navObj={navObj} />
      <SearchResults resultsObj={resultsObj} addToWishlist={addToWishlist} />
      <SearchResultsPagination resultsObj={resultsObj} navObj={navObj} />
    </>
  );
};

export default SetsSearchResults;
