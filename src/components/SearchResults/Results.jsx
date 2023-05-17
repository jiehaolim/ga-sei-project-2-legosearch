import { Link, useLocation, useSearchParams } from "react-router-dom";
import noImageAvailable from "../../img/noImageAvail.png";

const Results = ({ resultsObj }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get("pageNo") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "20";
  const lastPageNo = Math.ceil(resultsObj?.count / pageSize).toString();

  // computation of number of results
  const startNumResults =
    pageNo === "1" ? 1 : 1 + parseInt(pageSize) * (parseInt(pageNo) - 1);
  const endNumResults =
    lastPageNo === pageNo
      ? resultsObj?.count
      : resultsObj?.results.length * parseInt(pageNo);

  // variables for resultsObj
  const productIMG = "set_img_url";
  const productTitle = "name";
  const productNo = "set_num";
  const productParts = "num_parts";
  const productTheme = "theme";
  const productYear = "year";

  return (
    <div className="mt-8 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Showing {startNumResults.toLocaleString()} {" to "}{" "}
        {endNumResults.toLocaleString()} {" of "}{" "}
        {resultsObj?.count.toLocaleString()}
        {resultsObj?.count === 1 ? " result" : " results"}
      </h2>
      <div className="mt-8 mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resultsObj?.results.map((result) => (
          <div
            key={result[productNo]}
            className="bg-white border border-gray-300 rounded-lg relative p-4"
          >
            <div className="group relative">
              <div className="w-full h-48 sm:h-64 lg:h-64 xl:h-72 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={result[productIMG] ?? noImageAvailable}
                  alt={result[productTitle]}
                  className="h-full w-full object-contain bg-white object-center"
                />
              </div>
              <div className="pb-4 pt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <Link
                    to={
                      location.pathname.startsWith("/minifigures")
                        ? "/minifigures/result/" + result[productNo]
                        : "/result/" + result[productNo]
                    }
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {result[productTitle]}
                  </Link>
                </h3>
                <div className="mt-1 flex justify-between gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {result[productNo]}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {result[productParts].toLocaleString()}{" "}
                    {result[productParts] <= 1 ? "part" : "parts"}
                  </p>
                </div>
                {location.pathname.startsWith("/minifigures") ? null : (
                  <div className="mt-1 flex justify-between gap-x-4">
                    <p className="text-sm text-gray-500 truncate">
                      {result[productTheme]}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {result[productYear]}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add to Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
