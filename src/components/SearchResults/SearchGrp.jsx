import { MagnifyingGlassIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

const SearchGrp = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900 sr-only"
          >
            First name
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
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search for lego sets"
            />
          </div>
        </div>
        <div className="sm:col-start-5 sm:col-span-2">
          <button
            type="button"
            className="flex py-2 float-right rounded-md text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <ArrowDownIcon className="w-5 h-5" aria-hidden="true" />
            Advanced Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchGrp;
