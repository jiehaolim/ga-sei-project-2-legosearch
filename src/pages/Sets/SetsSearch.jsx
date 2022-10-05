import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchNavGrp from "../../components/SearchNavGrp";
import SearchResults from "../../components/SearchResults";

const SetsSearch = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({ results: [] });

  // obtain the search params from original search
  const term = searchParams.get("term");
  const theme = searchParams.get("theme");
  const minYear = searchParams.get("minYear") === null ? searchParams.get("year") : searchParams.get("minYear");
  const maxYear = searchParams.get("maxYear") === null ? searchParams.get("year") : searchParams.get("maxYear");
  const minParts = searchParams.get("minParts") === null ? "" : searchParams.get("minParts");
  const maxParts = searchParams.get("maxParts") === null ? "" : searchParams.get("maxParts");
  
  // obtain additional search params from sorting
  const sortOrdering = searchParams === null ? "set_num" : searchParams.get("sortOrdering") // name, set_num, year, num_parts
  const sortBy = searchParams.get("sortBy") === null ? "" : searchParams.get("sortBy") // asc is "", dsc is -
  const pageSize = searchParams.get("pageSize") === null ? 20 : searchParams.get("pageSize")
  const pageNo = searchParams.get("pageNo") === null ? 1 : searchParams.get("pageNo")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${term}&theme_id=${theme}&min_year=${minYear}&max_year=${maxYear}&min_parts=${minParts}&max_parts=${maxParts}&ordering=${
          sortBy}${sortOrdering}&page_size=${pageSize}&page=${pageNo}`
      );
      const data = await response.json();
      console.log(data)
      setResult(data);
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <SearchNavGrp />
      <SearchResults result={result} />
    </>
  );
};

export default SetsSearch;
