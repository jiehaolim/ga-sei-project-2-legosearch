import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import Results from "../Components/Results";
import Pagination from "../Components/Pagination";

const placeholderValue = "LEGO Minifigures..."

const FindMinifigures = () => {
  return (
    <div>
      <NavBar />
      <SearchBar placeholderValue = {placeholderValue} />
    </div>
  );
};

export default FindMinifigures;
