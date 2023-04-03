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
  // current year
  const date = new Date();
  const maxYear = date.getFullYear();
  const [searchObj, setSearchObj] = useState({
    term: searchParams.get("term") ? searchParams.get("term") : "",
    theme: searchParams.get("theme") ? searchParams.get("theme") : "",
  });
  const [advSearchObj, setAdvSearchObj] = useState({
    minParts: searchParams.get("minParts") ? searchParams.get("minParts") : 0,
    maxParts: searchParams.get("maxParts") ? searchParams.get("maxParts") : 15000, // largest lego set so far is 11695 parts
    minYear: searchParams.get("minYear") ? searchParams.get("minYear") : 1949, // year lego started
    maxYear: searchParams.get("maxYear") ? searchParams.get("maxYear") : maxYear, // current year
  })

  const handleSearchType = (boolean) => {
    setAdvSearch(boolean)
  }

  const handleChangeSearchObj = (key, value1, value2) => {
    if (key === "rangeParts") {
      setAdvSearchObj({...advSearchObj, ["minParts"]: value1, ["maxParts"]: value2})
    } else if (key === "rangeYears") {
      setAdvSearchObj({...advSearchObj, ["minYear"]: value1, ["maxYear"]: value2})
    } else {
      setSearchObj({...searchObj, [key]: value1})
    }
  }

  return (
    <>
      {advSearch ? (<SearchGrpAdv themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} advSearchObj={advSearchObj} handleChangeSearchObj={handleChangeSearchObj} /> 
      ) : ( <SearchGrpBasic themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} handleChangeSearchObj={handleChangeSearchObj}/>)}
      {/* <NavGrp /> */}
      <Results />
      <Pagination />
    </>
  );
};

export default HomeSearchResults;
