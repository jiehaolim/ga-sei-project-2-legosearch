import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./Search-Subcomponents/SearchBar";
import DropDownList from "../Common-Subcomponents/DropDownList";
import RangeYears from "./Search-Subcomponents/RangeYears"
import RangeParts from "./Search-Subcomponents/RangeParts"

const SearchGrpAdv = ({ searchObj, themes, handleChange, handleSearchType }) => {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar searchObj={searchObj} handleChange={handleChange} />
          <DropDownList stateObj={searchObj} selectObj={themes} handleChange={handleChange} />
          <br />
          {location.pathname.startsWith("/sets") ? <RangeYears searchObj={searchObj} handleChange={handleChange}/> : null}
          <br />
          <RangeParts searchObj={searchObj} handleChange={handleChange}/>
          <br />
          <button>Search</button>
        </fieldset>
      </form>
      <br />
      <button onClick={() => handleSearchType(true)}>- Advanced Search</button>
      <br />
    </div>
  );
};

export default SearchGrpAdv;
