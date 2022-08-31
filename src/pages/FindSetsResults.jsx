import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const API_KEY = import.meta.env.VITE_API_KEY
const pageSize = 32

const FindSetsResults = () => {
  const params = useParams()
  const search = params.searchterm
  const pageNo = params.pagenum
  const [results, setResults] = useState({results:[]})
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${search}&
        page_size=${pageSize}&page=${pageNo}`)
      const data = await response.json()
      setResults(data)}

      fetchData()
    }, [params])

  return (
    <div>
      <Testing results={results}/>
    </div>
  );
};

export default FindSetsResults
