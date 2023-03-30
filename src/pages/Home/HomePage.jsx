import { useState } from "react";
import recommendedSetThemes from "../../data/recommendedSetThemes";
import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";

const HomePage = () => {
  const [query, setQuery] = useState("")
  
  const handleChange = (string) => {
    setQuery(string)
  }

  return (
    <>
      <Search query={query} handleChange={handleChange} />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
