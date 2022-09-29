import { Link } from "react-router-dom";

const NavBar = () => {
  
  const navigation = [
    { name: "Home", to: "/" },
    { name: "Sets", to: "/sets" },
    { name: "Minifigures", to: "/minifigures" },
    { name: "Wishlist", to: "/wishlist" },
  ];

  return (
    <>
      {navigation.map((element, index) => (
        <Link to={element.to} key={index}>
          <p>{element.name}</p>
        </Link>
      ))}
      <br />
      <br />
    </>
  );
};

export default NavBar;
