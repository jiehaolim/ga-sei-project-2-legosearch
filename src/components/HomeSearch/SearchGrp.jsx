import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./Search-Subcomponents/SearchBar";
import DropDownList from "../Common-Subcomponents/DropDownList";

const SearchGrp = ({ searchObj, themes, handleChange, handleSearchType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.pathname.startsWith("/sets")) {
      navigate({ pathname: "/sets/search", search: "?" + createSearchParams(searchObj)});
    } else if (location.pathname.startsWith("/minifigures")) {
      navigate({ pathname: "/minifigures/search", search: "?" + createSearchParams(searchObj)});
    }
  };

  // data for year drop down list
  // year lego releases their first set
  const minYear = "1949"
  const date = new Date()
  const maxYear = date.getFullYear()
  
  // generate an array of year for the drop down list
  const arrayYear = { "year":[{ "name":"Year", "value":"" }] }
  for (let i = maxYear; i >= minYear; i--) {
    arrayYear.year.push({"name":i, "value":i})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar searchObj={searchObj} handleChange={handleChange} />
          <DropDownList stateObj={searchObj} selectObj={themes} handleChange={handleChange} />
          {location.pathname.startsWith("/sets") ? <DropDownList stateObj={searchObj} selectObj={arrayYear} handleChange={handleChange} />  : null}
          <button>Search</button>
        </fieldset>
        <button onClick={() => handleSearchType(false)}>+ Advanced Search</button>
      </form>
      <br />
    </div>
  );
};

export default SearchGrp;
