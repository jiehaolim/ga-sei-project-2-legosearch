import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Home/NavBar";
import Footer from "../../components/Shared/Footer";

const HomeNavBar = () => {
  const [contentLoaded, setContentLoaded] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <div className="flex-grow">
          <Outlet context={[contentLoaded, setContentLoaded]} />
        </div>

        {contentLoaded ? <Footer /> : null}
      </div>
    </>
  );
};

export default HomeNavBar;
