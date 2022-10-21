const WishlistButtonTabs = ({ setView }) => {
  return (
    <>
      <h2>Wishlist Home</h2>
      <button onClick={() => setView("sets")}>View Sets</button>
      <button onClick={() => setView("minifigs")}>View Minifigures</button>
      <button onClick={() => setView("edit")}>Edit Wishlist</button>
      <br />
      <br />
    </>
  );
};

export default WishlistButtonTabs;
