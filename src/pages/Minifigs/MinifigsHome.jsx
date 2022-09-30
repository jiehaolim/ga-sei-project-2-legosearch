import { Outlet } from "react-router-dom";
import SimpleSearchGrp from "../../components/SimpleSearchGrp";

const MinifigsHome = () => {
  return (
    <>
      <SimpleSearchGrp />
      <Outlet />
    </>
  );
};

export default MinifigsHome;
