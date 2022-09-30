import { useLocation } from "react-router-dom";

const SearchBar = ({ searchObj, handleChange }) => {
  const location = useLocation();

  // update the text according to the page
  let placeholderValue = "";
  if (location.pathname.startsWith("/sets")) {
    placeholderValue = "LEGO Sets...";
  } else if (location.pathname.startsWith("/minifigures")) {
    placeholderValue = "LEGO Minifigures...";
  }

  return (
    <>
      <input
        type="text"
        id="search"
        name="search"
        required
        placeholder={"Search for " + placeholderValue}
        value={searchObj.term}
        onChange={() => handleChange("term", event.target.value)}
      ></input>
    </>
  );
};

export default SearchBar;
