import { Outlet } from "react-router-dom";
import NavBarComponent from "../components-layout/NavBarComponent";

const NavBar = () => {
  return (
    <>
        <NavBarComponent />
        <Outlet />
    </>
  );
};

export default NavBar;
