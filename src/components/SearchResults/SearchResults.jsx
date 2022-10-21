import { Link, useLocation } from "react-router-dom";

const SearchResults = ({ resultsObj, addToWishlist }) => {
  const location = useLocation()
  let path = ""
  // update the URL per location
  if (location.pathname.startsWith("/sets")) {
    path = "/sets/result/"
  } else if (location.pathname.startsWith("/minifigures")) {
    path = "/minifigures/result/"
  }

  return (
    <>
      <div>main results of {resultsObj?.count}</div>
      {resultsObj.results.map((element) => (
        <div key={element.set_num}>
          <Link to={`${path}${element.set_num}`}>
              <div>{element.set_num}</div>
              <div>{element.name}</div>
              {location.pathname.startsWith("/sets") ? <div>{element.year}</div> : null}
              <div>{element.num_parts}</div>
              <div>{element.set_img_url}</div>
              <div>{element.set_url}</div>
          </Link>
          <br/>
          <button onClick={() => addToWishlist()}>Add to Wishlist</button>
          <br/>
          <br/>
        </div>
      ))}
    </>
  );
};

export default SearchResults;

// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
// minifigs - set_num, name, num_parts, set_img_url, set_url