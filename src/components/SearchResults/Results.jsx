import { Link } from "react-router-dom";

const Results = ({ resultsObj }) => {
  const productIMG = "set_img_url";
  const productTitle = "name";
  const productNo = "set_num";
  const productParts = "num_parts";
  const productTheme = "theme";
  const productYear = "year";
  const productURL = "set_url";

  return (
    <div className="mt-8 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
      Showing {resultsObj.count.toLocaleString()} related {resultsObj.count === 1 ? "result" : "results"}
      </h2>
      <div className="mt-8 mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resultsObj.results.map((result) => (
          <div
            key={result[productNo]}
            className="bg-white border border-gray-300 rounded-lg relative p-4"
          >
            <div className="group relative">
              <div className="w-full h-48 sm:h-64 lg:h-64 xl:h-72 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={result[productIMG]}
                  alt={result[productTitle]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <Link to={result[productURL]}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {result[productTitle]}
                  </Link>
                </h3>
                <div className="mt-1 flex justify-between gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {result[productNo]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {result[productParts].toLocaleString()} {result[productParts] <= 1 ? "part" : "parts"}
                  </p>
                </div>
                <div className="mt-1 flex justify-between gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {result[productTheme]}
                  </p>
                  <p className="text-sm text-gray-500">{result[productYear]}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add to my collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
