import Search from "../../components/Search";
import RecommendedGrid from "../../components/RecommendedGrid";

const searchTitle = "sets"

const HomePage = () => {
  return (
    <>
      <Search searchTitle={searchTitle} />
      <RecommendedGrid />
    </>
  );
};

export default HomePage;
