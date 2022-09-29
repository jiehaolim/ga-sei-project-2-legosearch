import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/SearchGrp";

const MinifigsHome = () => {
  return (
    <>
      <SearchGrp />
      <Outlet />
    </>
  );
};

export default MinifigsHome;
