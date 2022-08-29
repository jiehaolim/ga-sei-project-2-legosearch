import { Link, useLocation } from "react-router-dom";
import noImageAvail from "../img/no-image-avail.png"

const API_KEY = import.meta.env.VITE_API_KEY;

const SearchResults = ({ results, addDetailsToCollection }) => {
  const location = useLocation();

  // showing number of results
  const dataCount = results.count;
  // array for mapping the data
  const dataArray = results?.results;

  // to fetch minifigures data from the set that the user select
  const fetchData = async (id) => {
    const Minifig = await fetch(
      `https://rebrickable.com/api/v3/lego/sets/${id}/minifigs/?key=${API_KEY}`
    );
    return await Minifig.json();
  };

  // callback function to uplift the event
  const addToCollection = async (id, name, imageURL) => {
    if (location.pathname.startsWith("/findsets")) {
      let minifigArray = [];
      // fetch minfigures from the set
      let minifigDetails = await fetchData(id);
      // make minfigures data into an array
      if (minifigDetails.count === 0) {
      } else {
        for (const element of minifigDetails.results) {
          minifigArray.push({id: element.set_num, name: element.set_name, imageURL: element.set_img_url, qty: element.quantity,});
        }
      }
      let item = [
        { sets: [{ id: id, name: name, imageURL: imageURL, qty: 1 }] },
        { minifigs: minifigArray },
      ];
      addDetailsToCollection(item);
    } else if (location.pathname.startsWith("/findminifigures")) {
      let item = [
        { sets: [] },
        { minifigs: [{ id: id, name: name, imageURL: imageURL, qty: 1 }] },
      ];
      addDetailsToCollection(item);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Showing {dataCount} related {dataCount === 1 ? "result" : "results"}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {(dataArray ?? []).map((product, index) => (
          <div
            key={product.set_num}
            className="mt-8 flex flex-col justify-between"
          >
            <div key={product.set_num} className="group relative">
              <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={
                    product.set_img_url === null
                      ? noImageAvail
                      : product.set_img_url
                  }
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-2 text-sm text-gray-700">
                <Link to={`${location.pathname}/${product.set_num}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              {product.year && (
                <p className="mt-1 text-sm text-gray-500">{product.year}</p>
              )}
              <p className="mt-1 text-sm font-medium text-gray-900 pb-2">
                {product.set_num}
              </p>
            </div>
            <button
              key={index}
              type="button"
              className="inline-flex items-center justify-center py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(event) => {
                addToCollection(product.set_num,product.name,product.set_img_url);
              }}
            >
              Add to My Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
