import { useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "../components-layout/SearchBar";
import ThemeDropDownList from "../components-layout/ThemeDropDownList";
import YearDropDownList from "../components-layout/YearDropDownList";

const SearchGrp = () => {
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
    year: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (key, value) => {
    setSearchObj({ ...searchObj, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.pathname.startsWith("/sets")) {
      navigate({ pathname: "/sets/search", search: "?" + createSearchParams(searchObj)});
    } else if (location.pathname.startsWith("/minifigures")) {
      navigate({ pathname: "/minifigures/search", search: "?" + createSearchParams(searchObj)});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar searchObj={searchObj} handleChange={handleChange} />
          <ThemeDropDownList handleChange={handleChange} />
          <YearDropDownList handleChange={handleChange} />
          <button>Search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchGrp;
