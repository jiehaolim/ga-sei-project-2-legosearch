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

  const handleChangeSB = (key, event) => {
    handleChange(key, event)
  }
  
  return (
    <>
      <input type="text" 
      id="search" 
      name="search" 
      required 
      placeholder={"Search for " + placeholderValue} 
      value={searchObj.term}
      onChange={() => handleChangeSB("term", event)}></input>
    </>
  );
};

export default SearchBar;
