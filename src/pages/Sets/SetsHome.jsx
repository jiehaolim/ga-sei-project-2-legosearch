import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/Search/SearchGrp";
import SearchGrpAdv from "../../components/Search/SearchGrpAdv";

const SetsHome = () => {
  // current year
  const date = new Date()
  const maxYear = date.getFullYear()

  // true === simple search, false === advanced search
  const [searchType, setSearchType] = useState(true);
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
    year: "",
  });
  const [searchAdvObj, setSearchAdvObj] = useState({
    term: "",
    theme: "",
    minYear: "1949",
    maxYear: maxYear,
    minParts: "0",
    maxParts: "15000",
  });

  const handleChange = (key, value1, value2) => {
    if (key === "term" || key === "theme") {
      setSearchObj({ ...searchObj, [key]: value1 });
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    } else if (key === "year") {
      setSearchObj({ ...searchObj, [key]: value1 });
    } else if (key === "rangeYears") {
      setSearchAdvObj({...searchAdvObj, ["minYear"]: value1, ["maxYear"]: value2 })
    } else if (key === "rangeParts") {
      setSearchAdvObj({...searchAdvObj, ["minParts"]: value1, ["maxParts"]: value2 })
    } else {
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    }
  };

  const handleSearchType = (value) => {
    setSearchType(value)
  }

  return (
    <>
      {searchType ? <SearchGrp searchObj={searchObj} handleChange={handleChange} handleSearchType={handleSearchType} /> :
      <SearchGrpAdv searchObj={searchAdvObj} handleChange={handleChange} handleSearchType={handleSearchType} /> }
      <Outlet />
    </>
  );
};

export default SetsHome;
