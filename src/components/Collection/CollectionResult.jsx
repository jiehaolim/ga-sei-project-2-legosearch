import { Link } from "react-router-dom";

const CollectionResult = () => {
  const results = {
    results: [
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme_id: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        set_url:
          "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
        last_modified_dt: "2020-06-11T22:07:30.703902Z",
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme_id: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        set_url:
          "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
        last_modified_dt: "2020-06-11T22:07:30.703902Z",
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme_id: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        set_url:
          "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
        last_modified_dt: "2020-06-11T22:07:30.703902Z",
      },
      {
        set_num: "76000-1",
        name: "Arctic Batman vs. Mr. Freeze: Aquaman on Ice",
        year: 2013,
        theme_id: 697,
        num_parts: 199,
        set_img_url: "https://cdn.rebrickable.com/media/sets/76000-1/44694.jpg",
        set_url:
          "https://rebrickable.com/sets/76000-1/arctic-batman-vs-mr-freeze-aquaman-on-ice/",
        last_modified_dt: "2020-06-11T22:07:30.703902Z",
      },
    ],
  };
  return (
    <div className="mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
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

            <h3 className="mt-4 text-sm font-medium text-gray-900">
              <Link to={`/result/${element.set_num}`}>
                <span className="absolute inset-0" />
                {element.set_name}
              </Link>
            </h3>

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

export default CollectionResult;
