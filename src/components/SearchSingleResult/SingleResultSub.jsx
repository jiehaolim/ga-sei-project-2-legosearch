import { useLocation, Link } from "react-router-dom";

const SingleResultSub = ({ resultObj }) => {
  const location = useLocation();

  // create variables for the text
  let title = "";
  const product = {
    array: resultObj?.results,
    imgURL: "set_img_url",
    num: "set_num",
    name: "",
    qty: "",
    link: "",
  }

  // update the text according to the page
  if (location.pathname.startsWith("/sets")) {
    resultObj?.count === 1 ? (title = "Minifigure in this set") : (title = "Minifigures in this set");
    product.name = "set_name";
    product.qty = "quantity";
    product.link = "/minifigures/result/";
  } else if (location.pathname.startsWith("/minifigures")) {
    resultObj?.count === 1 ? (title = "Minifigure appeared in the following set") : (title = "Minifigure appeared in the following sets");
    product.name = "name";
    product.qty = "";
    product.link = "/sets/result/";
  }

  // find the second dash "-" in the product.num to ensure both minifigures and set API are linked up properly
  // per tested most of the products number does not contain letters after the second dash "-"
  // splice is ok in the scenario as it splices the current product in the array -> ownself splice ownself
  for (const element of product.array) {
    if (element.set_num.indexOf("-") !== element.set_num.lastIndexOf("-")) {
      product.array.splice(product.array.indexOf(product), 1);
    }
  }

  return (
    <>
      <br />
      <br />
      {product.array.map((element) => (
        <Link to={product.link + element[product.num]} key={element[product.name]}>
          <div>{element[product.name]}</div>
          <div>{element[product.num]}</div>
          <div>{element[product.qty]}</div>
          <div>{element[product.imgURL]}</div>
        </Link>
      ))}
    </>
  );
};

export default SingleResultSub;

// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
// minifigs - set_num, name, num_parts, set_img_url, set_url
