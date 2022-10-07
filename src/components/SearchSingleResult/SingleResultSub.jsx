import { useLocation, Link } from "react-router-dom";

const SingleResultSub = ({ resultObj }) => {
  const location = useLocation();

  // create variables for the text
  let title = "";
  let productArray = resultObj?.results;
  const productURL = "set_img_url";
  const productNum = "set_num";
  let productName = "";
  let productQty = "";
  let productlink = "";

  // update the text according to the page
  if (location.pathname.startsWith("/sets")) {
    resultObj?.count === 1 ? (title = "Minifigure in this set") : (title = "Minifigures in this set");
    productName = "set_name";
    productQty = "quantity";
    productlink = "/minifigures/result/";
  } else if (location.pathname.startsWith("/minifigures")) {
    resultObj?.count === 1 ? (title = "Minifigure appeared in the following set") : (title = "Minifigure appeared in the following sets");
    productName = "name";
    productQty = "";
    productlink = "/sets/result/";
  }

  // find the second dash "-" in the productNum to ensure both minifigures and set API are linked up properly
  // per tested most of the products number does not contain letters after the second dash "-"
  // splice is ok in the scenario as it splices the current product in the array -> ownself splice ownself
  for (const product of productArray) {
    if (product.set_num.indexOf("-") !== product.set_num.lastIndexOf("-")) {
      productArray.splice(productArray.indexOf(product), 1);
    }
  }

  return (
    <>
      <br />
      <br />
      {productArray.map((product) => (
        <Link to={productlink + product[productNum]} key={product[productName]}>
          <div>{product[productName]}</div>
          <div>{product[productNum]}</div>
          <div>{product[productQty]}</div>
          <div>{product[productURL]}</div>
        </Link>
      ))}
    </>
  );
};

export default SingleResultSub;

// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
// minifigs - set_num, name, num_parts, set_img_url, set_url
