import { useState } from "react";
import SearchBar from "../components-layout/SearchBar"

const SearchGrp = () => {
  const [searchObj, setSearchObj] = useState({term:""})
  
  const handleChange = (key, event) => {
    setSearchObj({...searchObj, [key]: event.target.value})
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("This is gonna be awesome.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar searchObj={searchObj} handleChange={handleChange}/>
          <br />
          <button>Search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchGrp;
