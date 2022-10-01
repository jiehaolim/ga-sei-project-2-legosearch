import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SetsSearch = () => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const [searchParams, setSearchParams] = useSearchParams()
  const [result, setResult] = useState({results:[]})

  // obtain the search params
  const term = searchParams.get("term")
  const theme = searchParams.get("theme")
  const minYear = searchParams.get("minYear") === null ? searchParams.get("year") : searchParams.get("minYear")
  const maxYear = searchParams.get("maxYear") === null ? searchParams.get("year") : searchParams.get("maxYear")
  const pageSize = 40;

  useEffect (() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${term}&theme_id=${theme}&min_year=${minYear}&max_year=${maxYear}&page_size=${pageSize}`
      )
      const data = await response.json();
      console.log(data)
      setResult(data)}
      fetchData()
  },[searchParams])
 
  return (
    <>
      <div>main results</div>
      {result.results.map((element) => <div key={element.set_num}>
        <div>{element.set_num}</div>
        <div>{element.name}</div>
        <div>{element.year}</div>
        <div>{element.num_parts}</div>
        <div>{element.set_img_url}</div>
        <br />
        </div>)}
    </>
  );
};

export default SetsSearch;
