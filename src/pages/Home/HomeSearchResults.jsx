import SearchGrp from "../../components/SearchResults/SearchGrp";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import Results from "../../components/SearchResults/Results";

const HomeSearchResults = () => {
  return (
    <>
      <SearchGrp />
      <SearchGrpAdv />
      <Results />
    </>
  );
};

export default HomeSearchResults;
