import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SelectMenu from "../Shared/SelectMenu";
import { MagnifyingGlassIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

const SearchGrpBasic = ({ themes, handleSearchType }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTitle = location.pathname.startsWith("/minifigures")
    ? "minifigures"
    : "sets";
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
  });

  const handleChange = (key, event) => {
    setSearchObj({ ...searchObj, [key]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchObj.term.trim() === "" && searchObj.theme === "") {
      return;
    } else {
      setSearchParams({ term: searchObj.term.trim(), theme: searchObj.theme });
    }
  };

  useEffect(() => {
    setSearchObj({
      ...searchObj,
      term: searchParams.get("term") ?? "",
      theme: searchParams.get("theme") ?? "",
    });
  }, [searchParams.toString()]);

  return (
    <div className="mt-8 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <form action="#" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 rounded-md ring-1 shadow-sm ring-gray-300 px-3 py-2">
          <div className="sm:col-span-3 mt-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium leading-6 text-gray-900 sr-only"
            >
              {"Search for LEGO " + searchTitle}
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
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder={"Search for LEGO " + searchTitle}
                value={searchObj.term}
                onChange={(event) => {
                  handleChange("term", event);
                }}
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
            <SelectMenu
              selectObj={themes}
              stateObj={searchObj}
              handleChange={handleChange}
            />
          </div>
          <div className="sm:col-start-6 sm:col-span-1 mt-1 mb-1">
            <button
              type="button"
              className="block w-full float-right rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
        <button
          type="button"
          className="col-start-7 flex py-2 float-right rounded-md text-sm font-semibold text-blue-600 hover:text-blue-500"
          onClick={() => {
            handleSearchType(true);
          }}
        >
          <ArrowDownIcon className="w-5 h-5" aria-hidden="true" />
          Advanced Search
        </button>
      </div>
    </div>
  );
};

export default SearchGrpBasic;
