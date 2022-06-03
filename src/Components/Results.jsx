import { Link } from "react-router-dom"

const Results = ({ results }) => {
  // showing number of results
  const dataCount = results.count
  // array for mapping the data
  const dataArray = results?.results;
  return (
    <div className="max-w-2xl mx-auto py-6 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Showing {dataCount} related {dataCount === 1 ? "result" : "results" }
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {(dataArray ?? []).map((product) => (
          <div key={product.set_num} className="group relative">
            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={
                  product.set_img_url === null
                    ? "https://rebrickable.com/static/img/nil.png"
                    : product.set_img_url
                }
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link to={`/FindSets/${product.set_num}`}>
                <span className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.year}</p>
            <p className="mt-1 text-sm font-medium text-gray-900 pb-6">
              {product.set_num}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
