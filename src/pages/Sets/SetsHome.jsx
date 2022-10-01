import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/SearchGrp";
import SearchGrpAdv from "../../components/SearchGrpAdv";

const SetsHome = () => {
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
    minYear: "",
    maxYear: "",
    minParts: "",
    maxParts: "",
  });

  const handleChange = (key, value) => {
    if (key === "term" || key === "theme") {
      setSearchObj({ ...searchObj, [key]: value });
      setSearchAdvObj({ ...searchAdvObj, [key]: value });
    } if (key === "year") {
      setSearchObj({ ...searchObj, [key]: value });
    } else {
      setSearchAdvObj({ ...searchAdvObj, [key]: value });
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
