import { useState } from "react";
import recommendedMinifigThemes from "../../data/recommendedMinifigThemes";
import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";

const MinifigsHomePage = () => {
  const [query, setQuery] = useState("");

  const handleChange = (string) => {
    setQuery(string);
  };

  return (
    <>
      <Search query={query} handleChange={handleChange} />
      <RecommendedGrid recommendedThemes={recommendedMinifigThemes} />
    </>
  );
};

export default MinifigsHomePage;
