import { useState } from "react";
import recommendedMinifigThemes from "../../data/recommendedMinifigThemes";
import Search from "../../components/Shared/Search";
import RecommendedGrid from "../../components/Shared/RecommendedGrid";

const searchTitle = "minifigures"

const MinifigsHome = () => {    
    const [query, setQuery] = useState("")

    const handleChange = (string) => {
        setQuery(string)
      }

    return (
        <>
            <Search searchTitle={searchTitle} query={query} handleChange={handleChange} />
            <RecommendedGrid recommendedThemes={recommendedMinifigThemes} />
        </>
    )
  };
  
  export default MinifigsHome