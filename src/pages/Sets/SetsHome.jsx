import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/SearchGrp";

const SetsHome = () => {
  return (
    <>
      <SearchGrp />
      <Outlet />
    </>
  );
};

export default SetsHome;
