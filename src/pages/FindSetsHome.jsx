import { Outlet } from "react-router-dom";

const FindSetsHome = () => {
  return (
    <>
      <h2 className="max-w-2xl mx-auto py-6 px-2 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 text-2xl font-extrabold tracking-tight text-gray-900">
        Themes
      </h2>
      <Outlet />
    </>
  );
};

export default FindSetsHome;
