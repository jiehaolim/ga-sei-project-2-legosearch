import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SelectMenu from "./Child/SelectMenu";
import RangeParts from "./Child/RangeParts";
import RangeYears from "./Child/RangeYears";
import { MagnifyingGlassIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const SearchGrpAdv = ({ themes, handleSearchType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTitle =
    location.pathname.startsWith() === "/minifigures" ? "minifigures" : "sets";
  // current year
  const date = new Date();
  const maxYear = date.getFullYear();
  const [searchAdvObj, setSearchAdvObj] = useState({
    term: "",
    theme: "",
  });

  const [searchPartObj, setSearchPartObj] = useState({
    minParts: 0,
    maxParts: 15000, // largest lego set so far is 11695 parts
  });

  const [searchYearObj, setSearchYearObj] = useState({
    minYear: 1949, // year lego started
    maxYear: maxYear, // current year
  });

  const handleChange = (key, event) => {
    if (key === "rangeParts") {
      setSearchPartObj({
        ...searchPartObj,
        minParts: event.target.value1,
        maxParts: event.target.value2,
      });
    } else if (key === "rangeYears") {
      setSearchYearObj({
        ...searchYearObj,
        minYear: event.target.value1,
        maxYear: event.target.value2,
      });
    } else {
      setSearchAdvObj({ ...searchAdvObj, [key]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchAdvObj.term.trim() === "" && searchAdvObj.theme === "") {
      return;
    } else {
      const finalSearchObject = {
        term: searchAdvObj.term.trim(),
        theme: searchAdvObj.theme,
        minParts: searchPartObj.minParts,
        maxParts: searchPartObj.maxParts,
        minYear: searchYearObj.minYear,
        maxYear: searchYearObj.maxYear,
      };
      setSearchParams(finalSearchObject);
    }
  };

  useEffect(() => {
    const minPartsNum = searchParams.get("minParts");
    const maxPartsNum = searchParams.get("maxParts");
    const minYearNum = searchParams.get("minYear");
    const maxYearNum = searchParams.get("maxYear");
    if (
      isNaN(minPartsNum) ||
      isNaN(maxPartsNum) ||
      isNaN(minYearNum) ||
      isNaN(maxYearNum)
    ) {
      navigate("/error/400");
    } else if (
      parseInt(minPartsNum) < 0 ||
      parseInt(maxPartsNum) < 0 ||
      parseInt(minYearNum) < 0 ||
      parseInt(maxYearNum) < 0
    ) {
      navigate("/error/400");
    } else {
      setSearchAdvObj({
        ...searchAdvObj,
        term: searchParams.get("term") ?? "",
        theme: searchParams.get("theme") ?? "",
      });
      setSearchPartObj({
        minParts: searchParams.get("minParts") ?? 0,
        maxParts: searchParams.get("maxParts") ?? 15000, // largest lego set so far is 11695 parts
      });
      setSearchYearObj({
        minYear: searchParams.get("minYear") ?? 1949, // year lego started
        maxYear: searchParams.get("maxYear") ?? maxYear, // current year
      });
    }
  }, [searchParams.toString()]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <form className="mt-8" action="#" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 rounded-md ring-1 shadow-sm ring-gray-300 px-3 py-2">
          <div className="sm:col-span-4 mt-1">
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
                value={searchAdvObj.term}
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
              stateObj={searchAdvObj}
              handleChange={handleChange}
            />
          </div>

          <div className="sm:col-span-3 mt-1 p-2">
            <RangeParts searchObj={searchPartObj} handleChange={handleChange} />
          </div>

          <div className="sm:col-span-3 mt-1 p-2">
            <RangeYears searchObj={searchYearObj} handleChange={handleChange} />
          </div>
          <div className="sm:col-start-5 sm:col-span-2 mt-3 mb-1">
            <button
              type="button"
              className="block w-full sm:w-5/6 float-right rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <button
            type="button"
            className="col-start-7 flex mt-1 py-2 rounded-md text-sm font-semibold text-blue-600 hover:text-blue-500"
            onClick={(event) => {
              handleSearchType(false);
            }}
          >
            <ArrowUpIcon className="w-5 h-5" aria-hidden="true" />
            Basic Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchGrpAdv;
