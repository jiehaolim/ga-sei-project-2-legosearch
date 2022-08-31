import { Outlet } from "react-router-dom"
import SearchBar from "../components/SearchBar"

const FindSets = () => {
  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  );
};

export default FindSets
