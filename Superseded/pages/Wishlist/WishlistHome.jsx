import { useState } from "react";
import WishlistButtonTabs from "../../components/Wishlist/WishlistButtonTabs";
import WishlistResults from "../../components/Wishlist/WishlistResults";

const WishlistHome = ({ wishlistObj }) => {
  const [view, setView] = useState("sets");
  
  // title object
  const title = {
    sets: "Sets",
    minfigs: "Minifigures",
    edit: "Edit wishlist"
  }

  return (
    <>
      <WishlistButtonTabs setView={setView} />
      {view === "sets" ? (<WishlistResults title={title.sets} wishlist={wishlistObj} />) : 
      view === "minifigs" ? (<WishlistResults title={title.minfigs} wishlist={wishlistObj} />) : 
      (<WishlistResults title={title.edit} wishlist={wishlistObj} />)}
    </>
  );
};

export default WishlistHome;
