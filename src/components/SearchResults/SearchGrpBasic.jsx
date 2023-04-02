import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import SelectMenu from "./Child/SelectMenu";
import { MagnifyingGlassIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

const SearchGrpBasic = ({ themes, handleSearchType, searchObj, handleChangeSearchObj }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchTitle = location.pathname.startsWith() === "/minifigures" ? "minifigures" : "sets"

  const handleSubmit = (event) => {
    event.preventDefault()
    // remove null values from searchObj
    Object.keys(searchObj).forEach(key => {
      if (searchObj[key] === null) {
        delete searchObj[key];
      }
    });
    if (location.pathname.startsWith("/minifigures")) {
      navigate({ pathname: "/minifigures/search", search: "?" + createSearchParams(searchObj) });
    } else {
      navigate({ pathname: "/search", search: "?" + createSearchParams(searchObj) });
    }
  }

  return (
    <div className="mt-8 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 rounded-md ring-1 shadow-sm ring-gray-300 px-3 py-2">
        <div className="sm:col-span-3 mt-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={"Search for LEGO " + searchTitle}
              value={searchObj.term}
              onChange={() => {handleChangeSearchObj("term", event.target.value)}}
            />
          </div>
        </div>
        <div className="sm:col-span-2 mt-1">
            <label
              htmlFor="theme"
              className="block text-sm font-medium leading-6 text-gray-900 sr-only"
            >
              Theme
            </label>
            <SelectMenu selectObj={themes} stateObj={searchObj} handleChange={handleChangeSearchObj} />
          </div>
          <div className="sm:col-start-6 sm:col-span-1 mt-1 mb-1">
            <button
              onClick={() => {handleSubmit(event)}}
              type="button"
              className="block w-full float-right rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <button 
            type="button"
            onClick={() => {handleSearchType(true)}}
            className="col-start-7 flex py-2 float-right rounded-md text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <ArrowDownIcon className="w-5 h-5" aria-hidden="true" />
            Advanced Search
          </button>
        </div>
    </div>
  );
};

export default SearchGrpBasic;
