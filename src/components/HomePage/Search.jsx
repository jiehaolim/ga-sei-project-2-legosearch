import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import legoSearchLogo from "../../img/legosearchlogo.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const searchTitle = location.pathname.startsWith("/minifigures")
    ? "minifigures"
    : "sets";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      searchParams.set("term", query.trim());
      if (location.pathname.startsWith("/minifigures")) {
        navigate({
          pathname: "/minifigures/search",
          search: "?" + searchParams.toString(),
        });
      } else {
        navigate({
          pathname: "/search",
          search: "?" + searchParams.toString(),
        });
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mt-8 mx-auto max-w-md sm:mt-16 sm:max-w-3xl">
        <div>
          <div className="text-center">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="mx-auto h-12 w-auto sm:h-20"
                src={legoSearchLogo}
                alt="LEGO Search"
              />
            </div>
          </div>
          <form
            className="mt-6 sm:flex sm:items-center"
            action="#"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="mt-2 flex rounded-md shadow-sm w-full">
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
                  className="block w-full rounded-md border-0 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder={"Search for LEGO " + searchTitle}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
