import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CollectionTabs = ({ collectionObj }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "set";
  const [tabState, setTabState] = useState(currentTab);
  const tabs = [
    { name: "Complete Set", count: collectionObj["set"].count, id: "set" },
    {
      name: "Minifigure from Set",
      count: collectionObj["setMinifig"].count,
      id: "setMinifig",
    },
    { name: "Loose Build", count: collectionObj["build"].count, id: "build" },
    {
      name: "Loose Minifigure",
      count: collectionObj["minifig"].count,
      id: "minifig",
    },
  ];

  const handleChange = (id) => {
    setTabState(id);
    setSearchParams({ tab: id });
  };

  return (
    <div className="mt-4 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          value={tabState}
          onChange={(event) => handleChange(event.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleChange(tab.id)}
                className={
                  tab.id === currentTab
                    ? "border-blue-500 text-blue-600 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                }
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={
                      tab.id === currentTab
                        ? "bg-indigo-100 text-blue-600 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                        : "bg-gray-100 text-gray-900 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                    }
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CollectionTabs;
