import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchGrpBasic from "../../components/SearchResults/SearchGrpBasic";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import NavGrp from "../../components/SearchResults/NavGrp";
import Results from "../../components/SearchResults/Results";
import Pagination from "../../components/SearchResults/Pagination";

const HomeSearchResults = ({ themes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [advSearch, setAdvSearch] = useState(false);
  const [searchObj, setSearchObj] = useState({
    term: searchParams.get("term") ? searchParams.get("term") : null,
    theme: searchParams.get("theme") ? searchParams.get("theme") : null,
    minParts: searchParams.get("minParts") ? searchParams.get("minParts") : null,
    maxParts: searchParams.get("maxParts") ? searchParams.get("maxParts") : null,
    minYear: searchParams.get("minYear") ? searchParams.get("minYear") : null,
    maxYear: searchParams.get("maxYear") ? searchParams.get("maxYear") : null,
  });

  const handleSearchType = (boolean) => {
    setAdvSearch(boolean)
  }

  const handleChangeSearchObj = (key, value) => {
    setSearchObj({...searchObj, [key]: value})
  }

  console.log(searchObj)

  return (
    <>
      {advSearch ? (<SearchGrpAdv themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} handleChangeSearchObj={handleChangeSearchObj} /> 
      ) : ( <SearchGrpBasic themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} handleChangeSearchObj={handleChangeSearchObj}/>)}
      {/* <NavGrp /> */}
      <Results />
      <Pagination />
    </>
  );
};

export default HomeSearchResults;
