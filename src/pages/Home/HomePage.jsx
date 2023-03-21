import Search from "../../components/Search";
import Recommended from "../../components/recommended";

const searchTitle = "sets"

const HomePage = () => {
  return (
    <>
      <Search searchTitle={searchTitle} />
      <Recommended />
    </>
  );
};

export default HomePage;
