import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./subcomponents/SearchBar";
import DropDownListTheme from "./subcomponents/DropDownListTheme"
import DropDownListYear from "./subcomponents/DropDownListYear"
import RangeYears from "./subcomponents/RangeYears"

const SearchGrp = ({ searchObj, handleChange, handleSearchType }) => {
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
          <DropDownListTheme searchObj={searchObj} handleChange={handleChange} />
          <DropDownListYear handleChange={handleChange} />
          <RangeYears />
          <button>Search</button>
        </fieldset>
      </form>
      <br />
      <button onClick={() => handleSearchType(false)}>+ Advanced Search</button>
      <br />
    </div>
  );
};

export default SearchGrp;
