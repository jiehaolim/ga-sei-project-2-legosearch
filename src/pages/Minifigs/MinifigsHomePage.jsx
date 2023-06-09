import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";
import recommendedMinifigThemes from "../../data/recommendedMinifigThemes";

const MinifigsHomePage = () => {
  const [contentLoaded, setContentLoaded] = useOutletContext();

  useEffect(() => {
    setContentLoaded(true);
  }, []);

  return (
    <>
      <Search />
      <RecommendedGrid recommendedThemes={recommendedMinifigThemes} />
    </>
  );
};

export default MinifigsHomePage;
