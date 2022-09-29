import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Sets", to: "/sets" },
  { name: "Minifigures", to: "/minifigures" },
  { name: "Wishlist", to: "/wishlist" },
];

const NavBar = () => {
  const location = useLocation();
  return (
    <>
      {navigation.map( element => (<Link to={element.to}><p>{element.name}</p></Link>))}
      <br />
    </>
  );
};

export default NavBar;
