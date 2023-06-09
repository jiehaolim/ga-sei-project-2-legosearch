import { Link, useLocation } from "react-router-dom";
import noImageAvailable from "../../img/noImageAvail.png";

const ResultFooter = ({ results }) => {
  const location = useLocation();

  // find the second dash "-" in the productNum to ensure both minifigures and set API are linked up properly
  // per tested most of the products number does not contain letters after the second dash "-"
  // splice is ok in the scenario as it splices the current product in the array -> ownself splice ownself
  for (const result of results.results) {
    if (result.set_num.indexOf("-") !== result.set_num.lastIndexOf("-")) {
      results.results.splice(results.results.indexOf(result), 1);
    }
  }

  return (
    <div className="mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
      {location.pathname.startsWith("/minifigures") ? (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {results.count > 1
            ? "Minifigure appeared in the following sets"
            : "Minifigure appeared in the following set"}
        </h2>
      ) : (
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {results.count > 1
              ? "Minifigures in this set"
              : "Minifigure in this set"}
          </h2>
        </div>
      )}

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-4 md:gap-y-4 lg:gap-x-8">
        {results.results.map((element) => (
          <div key={element.set_num} className="group relative">
            <div className="mt-4 h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={
                  element.set_img_url ? element.set_img_url : noImageAvailable
                }
                alt={element.set_name}
                className="h-full w-full object-contain bg-white object-center"
              />
            </div>
            {location.pathname.startsWith("/minifigures") ? (
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                <Link
                  to={`/result/${element.set_num}`}
                  state={{ prevPath: location.pathname }}
                >
                  <span className="absolute inset-0" />
                  {element.name}
                </Link>
              </h3>
            ) : (
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                <Link
                  to={`/minifigures/result/${element.set_num}`}
                  state={{ prevPath: location.pathname }}
                >
                  <span className="absolute inset-0" />
                  {element.set_name}
                </Link>
              </h3>
            )}
            <p className="mt-1 text-sm text-gray-500">{element.set_num}</p>
            {location.pathname.startsWith("/minifigures") ? null : (
              <p className="mt-1 text-sm font-medium text-gray-700">
                {"Quantity: " + element.quantity}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultFooter;
