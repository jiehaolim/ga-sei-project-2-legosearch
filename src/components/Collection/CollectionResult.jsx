import { useSearchParams } from "react-router-dom";
import noImageAvailable from "../../img/noImageAvail.png";
import { Link } from "react-router-dom";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const CollectionResult = ({ collection, handleAdd, handleRemove }) => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "set";

  return (
    <div className="mt-4 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <div className="mt-4 mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.map((result) => (
          <div
            key={result.set_num}
            className="bg-white border border-gray-300 rounded-lg relative p-4"
          >
            <div className="group relative">
              <div className="w-full h-48 sm:h-64 lg:h-64 xl:h-72 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={result.set_img_url ?? noImageAvailable}
                  alt={
                    currentTab === "setMinifig" ? result.set_name : result.name
                  }
                  className="h-full w-full object-contain bg-white object-center"
                />
              </div>
              <div className="pb-2 pt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <Link
                    to={
                      currentTab === "setMinifig" || currentTab === "minifig"
                        ? "/minifigures/result/" + result.set_num
                        : "/result/" + result.set_num
                    }
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {currentTab === "setMinifig"
                      ? result.set_name
                      : result.name}
                  </Link>
                </h3>
                <div className="mt-1 flex justify-between gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {result.set_num}
                  </p>
                  {currentTab === "setMinifig" ? (
                    <p className="text-sm text-gray-500 truncate">
                      {"Set: " + result.related_set}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 truncate">
                      {result.num_parts.toLocaleString()}{" "}
                      {result.num_parts <= 1 ? "part" : "parts"}
                    </p>
                  )}
                </div>
                {currentTab === "setMinifig" ? (
                  <div className="mt-1 flex justify-between gap-x-4">
                    <p className="text-sm text-gray-700 font-medium truncate">
                      {"Quantity: " + result.quantity}
                    </p>
                  </div>
                ) : currentTab === "minifig" ? null : (
                  <div className="mt-1 flex justify-between gap-x-4">
                    <p className="text-sm text-gray-500 truncate">
                      {result.theme}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {result.year}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {currentTab === "setMinifig" ? null : (
              <div className="grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-3 rounded-md ring-1 shadow-sm ring-blue-600">
                <button
                  type="button"
                  className="col-start-1 flex py-2 items-center justify-center rounded-md text-white hover:bg-green-500 bg-blue-600"
                  onClick={() => handleAdd(currentTab, result)}
                >
                  <PlusIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="col-start-2 flex py-2 items-center justify-center rounded-md text-black-500">
                  {result.quantity}
                </div>
                <button
                  type="button"
                  className="col-start-3 flex py-2 items-center justify-center rounded-md text-white hover:bg-red-500 bg-blue-600"
                  onClick={() => handleRemove(currentTab, result)}
                >
                  <MinusIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionResult;
