import WishlistDetails from "../../components/Wishlist/WishlistDetails";

const WishlistHome = ({ wishlist }) => {
  return (
    <>
      <h2>Wishlist Home</h2>
      <WishlistDetails wishlist={wishlist} />
      <WishlistDetails wishlist={wishlist} />
    </>
  );
};

export default WishlistHome;
