import { Outlet } from "react-router-dom"
import NavBar from "../components-layout/NavBar"

const HomeNavBar = () => {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  );
};

export default HomeNavBar
