import legoSearchLogo from "../../img/legosearchlogo.png";
import recommendedThemes from "../../data/recommendedthemes";

const MainSearch = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mt-8 mx-auto max-w-md sm:mt-16 sm:max-w-3xl">
        <div>
          <div className="text-center">
            <div className="flex flex-shrink-0 items-center">
              <img className="mx-auto h-12 w-auto sm:h-20"
                src={legoSearchLogo}
                alt="LEGO Search"
              />
            </div>
          </div>
          <form className="mt-6 sm:flex sm:items-center" action="#">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="grid grid-cols-1 sm:flex-auto">
              <input type="text"
                name="search"
                id="search"
                className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Search for LEGO sets"
              />
              <div className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600"
                aria-hidden="true"
              />
            </div>
          </form>
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">
            Recommended LEGO Themes
          </h3>
          <ul
            role="list"
            className="mt-4 mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {recommendedThemes.map((themes, themesIdx) => (
              <li key={themesIdx}>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="flex min-w-0 flex-1 items-center space-x-3">
                    <span className="block flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={themes.imageUrl}
                        alt=""
                      />
                    </span>
                    <span className="block min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">
                        {themes.name}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
