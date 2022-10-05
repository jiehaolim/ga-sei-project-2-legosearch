import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../components/SearchResults";

const SetsSearch = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({ results: [] });

  // obtain the search params
  const term = searchParams.get("term");
  const theme = searchParams.get("theme");
  const minYear = searchParams.get("minYear") === null ? searchParams.get("year") : searchParams.get("minYear");
  const maxYear = searchParams.get("maxYear") === null ? searchParams.get("year") : searchParams.get("maxYear");
  const minParts = searchParams.get("minParts") === null ? "" : searchParams.get("minParts");
  const maxParts = searchParams.get("maxParts") === null ? "" : searchParams.get("maxParts");
  const sort = "-"; // empty or negative for reverse order
  const ordering = "year";
  const pageSize = 40;
  const pageNo = 1;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${term}&theme_id=${theme}&min_year=${minYear}&max_year=${maxYear}&min_parts=${minParts}&max_parts=${maxParts}&ordering=${
          sort + ordering}&page_size=${pageSize}&page=${pageNo}`
      );
      const data = await response.json();
      setResult(data);
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <SearchResults result={result} />
    </>
  );
};

export default SetsSearch;
