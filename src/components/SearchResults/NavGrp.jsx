import SelectMenu from "./Child/SelectMenu";

const NavGrp = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-2 sm:grid-cols-4">
        <div className="col-span-1">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900 pl-2"
          >
            Sort by
          </label>
          <SelectMenu />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900 pl-2"
          >
            Results per page
          </label>
          <SelectMenu />
        </div>
      </div>
    </div>
  );
};

export default NavGrp;
