import { useNavigate } from "react-router-dom";
import SearchBar from "../components-layout/SearchBar";
import ThemeDropDownList from "../components-layout/ThemeDropDownList";
import YearDropDownList from "../components-layout/YearDropDownList";

const SearchGrp = ({ searchObj, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/sets/search");
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
