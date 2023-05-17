import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";
import recommendedSetThemes from "../../data/recommendedSetThemes";

const HomePage = () => {
  return (
    <>
      <Search />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
