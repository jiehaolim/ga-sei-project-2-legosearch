import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/Search/SearchGrp";

const MinifigsHome = () => {
  return (
    <>
      <SearchGrp />
      <Outlet />
    </>
  );
};

export default MinifigsHome;
