import recommendedSetThemes from "../../data/recommendedSetThemes";
import Search from "../../components/Shared/Search";
import RecommendedGrid from "../../components/Shared/RecommendedGrid";

const searchTitle = "sets"

const HomePage = () => {
  return (
    <>
      <Search searchTitle={searchTitle} />
      <RecommendedGrid recommendedThemes={recommendedSetThemes} />
    </>
  );
};

export default HomePage;
