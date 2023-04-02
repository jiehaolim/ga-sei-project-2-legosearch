import recommendedSetThemes from "../../data/recommendedSetThemes";
import Search from "../../components/HomePage/Search";
import RecommendedGrid from "../../components/HomePage/RecommendedGrid";

const HomePage = () => {
  return (
    <>
      <Search />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
