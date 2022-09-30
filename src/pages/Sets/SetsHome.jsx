import { Outlet } from "react-router-dom";
import SimpleSearchGrp from "../../components/SimpleSearchGrp";

const SetsHome = () => {
  return (
    <>
      <SimpleSearchGrp />
      <Outlet />
    </>
  );
};

export default SetsHome;
