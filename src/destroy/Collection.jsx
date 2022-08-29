import { Link } from "react-router-dom"

const Collection = ({ titleName, collectionObj }) => {
  
  // create variables for the text
  let title = titleName
  let productArray = collectionObj
  const productURL = "imageURL"
  const productNum = "id"
  let productName = "name"
  let productQty = "qty"

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {(productArray ?? []).map((product) => (
          <div key={product[productName]} className="group relative">
            <div className="mt-4 w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={
                  product[productURL] === null
                    ? "/img/No_image_available.png"
                    : product[productURL]
                }
                alt={product[productName]}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link to={title.startsWith("LEGO") ? `/findsets/${product[productNum]}`: `/findminifigures/${product[productNum]}`}>
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

export default Collection;
