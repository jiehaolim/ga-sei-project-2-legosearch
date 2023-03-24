import { useState } from "react";
import recommendedSetThemes from "../../data/recommendedSetThemes";
import Search from "../../components/Shared/Search";
import RecommendedGrid from "../../components/Shared/RecommendedGrid";

const searchTitle = "sets"

const HomePage = () => {
  const [query, setQuery] = useState("")
  
  const handleChange = (string) => {
    setQuery(string)
  }

  return (
    <>
      <Search searchTitle={searchTitle} query={query} handleChange={handleChange} />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
