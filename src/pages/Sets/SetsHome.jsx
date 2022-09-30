import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/SearchGrp";

const SetsHome = () => {
  const [searchObj, setSearchObj] = useState({ term: "" });

  const handleChange = (key, value) => {
    setSearchObj({ ...searchObj, [key]: value });
  };

  return (
    <>
      <SearchGrp searchObj={searchObj} handleChange={handleChange} />
      <Outlet context={[searchObj, setSearchObj]} />
    </>
  );
};

export default SetsHome;
