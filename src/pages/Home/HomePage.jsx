import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";
import recommendedSetThemes from "../../data/recommendedSetThemes";

const HomePage = () => {
  const [contentLoaded, setContentLoaded] = useOutletContext();

  useEffect(() => {
    setContentLoaded(true);
  }, []);

  return (
    <>
      <Search />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
