import { Outlet } from "react-router-dom";
import NavBar from "../../components/Home/NavBar";

const HomeNavBar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default HomeNavBar;
