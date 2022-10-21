import { useLocation } from "react-router-dom";
const API_KEY = import.meta.env.VITE_API_KEY

const SingleResultMain = ({ resultObj, addToWishlist }) => {
  const location = useLocation();

  // create variables for the text
  const product = {
    name: resultObj?.name,
    num: resultObj?.set_num,
    title: "",
    year: "",
    pieces: resultObj?.num_parts,
    imgURL: resultObj?.set_img_url,
    rebrickableURL: resultObj?.set_url,
    theme: resultObj?.theme
  }

  // update the text according to the page
  if (location.pathname.startsWith("/sets")) {
    product.title = product.num + " " + product.name;
    product.year = resultObj?.year;
  } else if (location.pathname.startsWith("/minifigures")) {
    product.title = product.name;
    product.year = product.num;
  }

  return (
    <>
      <br />
      <br />
      <div>{product.title}</div>
      <div>{product.year}</div>
      {location.pathname.startsWith("/sets") ? <div>{product.theme}</div> : null}
      <div>{product.pieces}</div>
      <div>{product.imgURL}</div>
      <div>{product.rebrickableURL}</div>
      <button onClick={() => addToWishlist()}>Add to Wishlist</button>
    </>
  );
};

export default SingleResultMain;

// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
// minifigs - set_num, name, num_parts, set_img_url, set_url
