import { useLocation, Link } from "react-router-dom";
import noImageAvail from "../img/noimgavail.png"

const ResultSub = ({ dataObj }) => {
  const location = useLocation()

  // create variables for the text
  let title = ""
  let productArray = dataObj?.minifig?.results
  const productURL = "set_img_url"
  const productNum = "set_num"
  let productName = ""
  let productQty = ""
  let productlink = ""
  
  // update the text according to the page
  if (location.pathname.startsWith("/findsets")) {
    dataObj?.minifig?.count === 1 ? title = "Minifigure in this set" : title = "Minifigures in this set" 
    productName = "set_name"
    productQty = "quantity"
    productlink = "/findminifigures/"
    
  } else if (location.pathname.startsWith("/findminifigures")) {
    dataObj?.minifig?.count === 1 ? title = "Minifigure appeared in the following set" : title = "Minifigure appeared in the following sets"
    productName = "name"
    productQty = ""
    productlink = "/findsets/"
  }

  // find the second dash "-" in the productNum to ensure both minifigures and set API are linked up properly
  // per tested most of the products number does not contain letters after the second dash "-"
  // splice is ok in the scenario as it splices the current product in the array -> ownself splice ownself
  for (const product of productArray) {
    if (product.set_num.indexOf("-") !== product.set_num.lastIndexOf("-")) {
      productArray.splice(productArray.indexOf(product),1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {(productArray ?? []).map((product) => (
          <div key={product[productName]} className="group relative">
            <div className="mt-4 w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={
                  product[productURL] === null
                    ? noImageAvail
                    : product[productURL]
                }
                alt={product[productName]}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link to={productlink + product[productNum]}>
                <span className="absolute inset-0" />
                {product[productName]}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product[productNum]}</p>
            {product[productQty] === undefined ? null : (<p className="mt-1 text-sm font-medium text-gray-900">
              Quantity: {product[productQty]}
            </p>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultSub;
