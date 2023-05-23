import { Link } from "react-router-dom";
import { PlusIcon, MinusIcon} from "@heroicons/react/24/solid";

const CollectionResult = () => {
  const results = {
    results: [
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        quantity: 1,
      },
    ],
  };
  return (
    <div className="mt-4 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <div className="mt-4 mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results?.results.map((result) => (
          <div
            key={result.set_num}
            className="bg-white border border-gray-300 rounded-lg relative p-4"
          >
            <div className="group relative">
              <div className="w-full h-48 sm:h-64 lg:h-64 xl:h-72 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={result.set_img_url ?? noImageAvailable}
                  alt={result.name}
                  className="h-full w-full object-contain bg-white object-center"
                />
              </div>
              <div className="pb-2 pt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <Link
                    to={
                      location.pathname.startsWith("/minifigures")
                        ? "/minifigures/result/" + result.set_num
                        : "/result/" + result.set_num
                    }
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {result.name}
                  </Link>
                </h3>
                <div className="mt-1 flex justify-between gap-x-4">
                  <p className="text-sm text-gray-500 truncate">
                    {result.set_num}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {result.num_parts.toLocaleString()}{" "}
                    {result.num_parts <= 1 ? "part" : "parts"}
                  </p>
                </div>
                {location.pathname.startsWith("/minifigures") ? null : (
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
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-3 rounded-md ring-1 shadow-sm ring-blue-600">
              <button
                type="button"
                className="col-start-1 flex py-2 items-center justify-center rounded-md text-white hover:bg-green-500 bg-blue-600"
              >
                <PlusIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <div
                className="col-start-2 flex py-2 items-center justify-center rounded-md text-black-500"
              >
                {result.quantity}
              </div>
              <button
                type="button"
                className="col-start-3 flex py-2 items-center justify-center rounded-md text-white hover:bg-red-500 bg-blue-600"
              >
                <MinusIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionResult;
