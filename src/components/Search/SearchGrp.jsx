import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./Search-Subcomponents/SearchBar";
import DropDownListTheme from "./Search-Subcomponents/DropDownListTheme"
import DropDownListYear from "./Search-Subcomponents/DropDownListYear"

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
          {location.pathname.startsWith("/sets") ? <DropDownListYear handleChange={handleChange} /> : null}
          <button>Search</button>
        </fieldset>
        <button onClick={() => handleSearchType(false)}>+ Advanced Search</button>
      </form>
      <br />
    </div>
  );
};

export default SearchGrp;
