import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SearchBar from "./search-components/SearchBar";
import DropDownListTheme from "./search-components/DropDownListTheme"
import RangeYears from "./search-components/RangeYears"
import RangeParts from "./search-components/RangeParts"

const SearchGrpAdv = ({ searchObj, handleChange, handleSearchType }) => {
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
          <br />
          <RangeYears searchObj={searchObj} handleChange={handleChange}/>
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
