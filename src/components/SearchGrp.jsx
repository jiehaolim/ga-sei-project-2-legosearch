import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./search-components/SearchBar";
import DropDownListTheme from "./search-components/DropDownListTheme"
import DropDownListYear from "./search-components/DropDownListYear"

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
          <button>Search</button>
        </fieldset>
        <button onClick={() => handleSearchType(false)}>+ Advanced Search</button>
      </form>
      <br />
    </div>
  );
};

export default SearchGrp;
