import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";
import recommendedMinifigThemes from "../../data/recommendedMinifigThemes";

const MinifigsHomePage = () => {
  return (
    <>
      <Search />
      <RecommendedGrid recommendedThemes={recommendedMinifigThemes} />
    </>
  );
};

export default MinifigsHomePage;
