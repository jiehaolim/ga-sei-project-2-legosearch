import { useSearchParams, useNavigate } from "react-router-dom";
import DropDownList from "../Common-Subcomponents/DropDownList";

const SearchNavGrp = ({ navObj }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const sortOrderObj = { sortOrdering: [
    { name: "Set No.", value: "set_num" },
    { name: "Name", value: "name" },
    { name: "Year", value: "year" },
    { name: "No. of Parts", value: "num_parts" },
  ]};
  const sortByObj = { sortBy: [
    { name: "Ascending", value: "" },
    { name: "Descending", value: "-" },
  ]};
  const pageSizeObj = { pageSize: [
    { name: "20", value: "20" },
    { name: "40", value: "40" },
  ]};

  // to remove the year option from minifigs
  if (location.pathname.startsWith("/minifigures")) {
    sortOrderObj.sortOrdering = sortOrderObj.sortOrdering.filter((element) => element.name !== "Year")
  }

  const handleChange = (key, value) => {
    event.preventDefault();
    searchParams.set("pageNo", 1)
    searchParams.set(key, value)
    // update the URL per location
    if (location.pathname.startsWith("/sets")) {
      navigate({ pathname: "/sets/search", search: "?" + searchParams.toString()});
    } else if (location.pathname.startsWith("/minifigures")) {
      navigate({ pathname: "/minifigures/search", search: "?" + searchParams.toString()});
    }
  };
  
  return (
    <>
      <DropDownList stateObj={navObj} selectObj={sortOrderObj} handleChange={handleChange} />
      <DropDownList stateObj={navObj} selectObj={sortByObj} handleChange={handleChange} />
      <DropDownList stateObj={navObj} selectObj={pageSizeObj} handleChange={handleChange} />
    </>
  );
};

export default SearchNavGrp;
