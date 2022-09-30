import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components-layout/SearchBar";
import ThemeDropDownList from "../components-layout/ThemeDropDownList";
import YearDropDownList from "../components-layout/YearDropDownList";

const SearchGrp = () => {
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
    year: "",
  });
  const navigate = useNavigate()

  const handleChange = (key, value) => {
    setSearchObj({ ...searchObj, [key]: value });
    console.log(key);
    console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("This is gonna be awesome.");
    navigate(`/sets/search=:${searchObj.term}/theme=:${searchObj.theme}/year=:${searchObj.year}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar searchObj={searchObj} handleChange={handleChange} />
          <button>Search</button>
          <ThemeDropDownList handleChange={handleChange} />
          <YearDropDownList handleChange={handleChange} />
        </fieldset>
      </form>
    </div>
  );
};

export default SearchGrp;
