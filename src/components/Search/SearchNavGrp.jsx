import { useSearchParams, useNavigate } from "react-router-dom";
import DropDownList from "./Navigation-Subcomponents/DropDownList"

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

  const handleSubmit = (key, value) => {
    event.preventDefault();
    if (key === "pageSize") {
      searchParams.set("pageNo", 1)
    }
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
      <DropDownList sortObj={sortOrderObj} navObj={navObj} handleSubmit={handleSubmit} />
      <DropDownList sortObj={sortByObj} navObj={navObj} handleSubmit={handleSubmit} />
      <DropDownList sortObj={pageSizeObj} navObj={navObj} handleSubmit={handleSubmit} />
    </>
  );
};

export default SearchNavGrp;
