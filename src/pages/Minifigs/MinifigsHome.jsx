import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/HomeSearch/SearchGrp";
import SearchGrpAdv from "../../components/HomeSearch/SearchGrpAdv";

const MinifigsHome = () => {
  // true === simple search, false === advanced search
  const [searchType, setSearchType] = useState(true);
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
  });
  const [searchAdvObj, setSearchAdvObj] = useState({
    term: "",
    theme: "",
    minParts: "0",
    maxParts: "250",
  });

  const handleChange = (key, value1, value2) => {
    if (key === "term" || key === "theme") {
      setSearchObj({ ...searchObj, [key]: value1 });
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    } else if (key === "rangeParts") {
      setSearchAdvObj({...searchAdvObj, ["minParts"]: value1, ["maxParts"]: value2});
    } else {
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    }
  };

  const handleSearchType = (value) => {
    setSearchType(value);
  };

  return (
    <>
      {searchType ? (<SearchGrp searchObj={searchObj} handleChange={handleChange} handleSearchType={handleSearchType}/>) 
      : (<SearchGrpAdv searchObj={searchAdvObj} handleChange={handleChange} handleSearchType={handleSearchType}/>)}
      <Outlet />
    </>
  );
};

export default MinifigsHome;
