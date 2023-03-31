import { useState } from "react";
import SearchBar from "../../components/SearchResults/SearchBar";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import NavGrp from "../../components/SearchResults/NavGrp";
import Results from "../../components/SearchResults/Results";
import Pagination from "../../components/SearchResults/Pagination";

const HomeSearchResults = () => {
  const [advSearch, setAdvSearch] = useState(false);
  return (
    <>
      {advSearch ? <SearchGrpAdv setAdvSearch={setAdvSearch} /> : <SearchBar setAdvSearch={setAdvSearch} />}
      <NavGrp />
      <Results />
      <Pagination />
    </>
  );
};

export default HomeSearchResults;
