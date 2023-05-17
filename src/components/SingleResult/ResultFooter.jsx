import { Link, useLocation } from "react-router-dom";

const ResultFooter = ({ results }) => {
  const location = useLocation();
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {results.count > 1
            ? "Minifigures in this set"
            : "Minifigure in this set"}
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {results.results.map((element) => (
          <div key={element.id} className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={element.set_img_url}
                alt={element.set_name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              {location.pathname.startsWith("/minifigures") ? (
                <Link to={`/result/${element.set_num}`}>
                  <span className="absolute inset-0" />
                  {element.set_name}
                </Link>
              ) : (
                <Link to={`/minifigures/result/${element.set_num}`}>
                  <span className="absolute inset-0" />
                  {element.set_name}
                </Link>
              )}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{element.set_num}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {"Quantity: " + element.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultFooter;
