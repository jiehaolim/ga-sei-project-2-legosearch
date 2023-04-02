import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchGrpBasic from "../../components/SearchResults/SearchGrpBasic";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import NavGrp from "../../components/SearchResults/NavGrp";
import Results from "../../components/SearchResults/Results";
import Pagination from "../../components/SearchResults/Pagination";

const HomeSearchResults = () => {
  const [advSearch, setAdvSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  for (const [key, value] of searchParams.entries()) {
    console.log(key, value)
  }
  return (
    <>
      {advSearch ? <SearchGrpAdv setAdvSearch={setAdvSearch} /> : <SearchGrpBasic setAdvSearch={setAdvSearch} />}
      <NavGrp />
      <Results />
      <Pagination />
    </>
  );
};

export default HomeSearchResults;
