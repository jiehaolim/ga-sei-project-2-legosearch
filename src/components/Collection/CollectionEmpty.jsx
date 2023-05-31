import { useSearchParams } from "react-router-dom";

const CollectionEmpty = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "set";

  let title = "";
  if (currentTab === "set") {
    title = "set";
  } else if (currentTab === "setMinifig") {
    title = "minifigures";
  } else if (currentTab === "minifig") {
    title = "loose minifigures";
  } else if (currentTab === "build") {
    title = "loose build";
  }

  return (
    <div className="mt-32 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          {"No LEGO " + title + " in collection."}
        </h3>
      </div>
    </div>
  );
};

export default CollectionEmpty;
