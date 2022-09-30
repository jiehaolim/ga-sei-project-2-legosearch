import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

const SetsSearch = () => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchObj, setSearchObj] = useOutletContext()
  const [result, setResult] = useState([])

  // obtain the search params
  const searchTerm = searchParams.get("term")
  const searchTheme = searchParams.get("theme") === null ? "" : searchParams.get("theme")
  const searchYear = searchParams.get("year") === null ? "" : searchParams.get("year")
  const pageSize = 40;

  useEffect (() => {
    // set search params in URL
    setSearchParams(searchObj)

    // fetch data
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${searchTerm}&theme_id=${searchTheme}&min_year=${searchYear}&max_year=${searchYear}&page_size=${pageSize}`
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
