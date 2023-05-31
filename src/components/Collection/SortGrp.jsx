import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SelectMenu from "../Shared/SelectMenu";

const SortGrp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortObj, setSortObj] = useState({
    sortBy: "set_num", // name, set_num, year, num_parts
    sortOrder: "", // asc is "", dsc is -
    pageSize: 20,
  });
  const sortByObj = {
    sortBy: [
      { name: "Set No", id: "set_num" },
      { name: "Name", id: "name" },
      { name: "No of Parts", id: "num_parts" },
      { name: "Year", id: "year" },
    ],
  };
  // remove year if the sort group is in minifigure search
  if (location.pathname.startsWith("/minifigures")) {
    sortByObj.sortBy.pop();
  }
  const sortOrderObj = {
    sortOrder: [
      { name: "Ascending", id: "" },
      { name: "Descending", id: "-" },
    ],
  };
  const pageSizeObj = {
    pageSize: [
      { name: "20", id: "20" },
      { name: "40", id: "40" },
    ],
  };

  const handleChange = (key, event) => {
    setSortObj({ ...sortObj, [key]: event.target.value });
    searchParams.set(key, event.target.value);
    // go back page 1
    searchParams.delete("pageNo");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const pageSizeNum = searchParams.get("pageSize");
    if (
      isNaN(pageSizeNum) ||
      parseInt(pageSizeNum) < 0 ||
      parseInt(pageSizeNum) > 1000
    ) {
      navigate("/error/400");
    } else {
      setSortObj({
        ...sortObj,
        sortBy: searchParams.get("sortBy") ?? "set_num",
        sortOrder: searchParams.get("sortOrder") ?? "",
        pageSize: searchParams.get("pageSize") ?? 20,
      });
    }
  }, [searchParams.toString()]);

  return (
    <div className="mt-4 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-5 lg:grid-cols-8">
        <div className="col-span-1 md:col-start-1 sm:col-start-1">
          <label
            htmlFor="sort-by"
            className="block text-sm font-medium leading-6 text-gray-900 pl-1"
          >
            Sort by
          </label>
          <SelectMenu
            selectObj={sortByObj}
            stateObj={sortObj}
            handleChange={handleChange}
          />
        </div>
        <div className="col-span-1 md:col-start-2 sm:col-start-2">
          <label
            htmlFor="sort-order"
            className="block text-sm font-medium leading-6 text-gray-900 pl-1"
          >
            Sort Order
          </label>
          <SelectMenu
            selectObj={sortOrderObj}
            stateObj={sortObj}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SortGrp;
