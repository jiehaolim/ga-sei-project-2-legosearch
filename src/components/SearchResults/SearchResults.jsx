import { Link, useLocation } from "react-router-dom";

const SearchResults = ({ results }) => {
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
      <div>main results of {results?.count}</div>
      {results.results.map((element) => (
        <Link key={element.set_num} to={`${path}${element.set_num}`}>
              <div>{element.set_num}</div>
              <div>{element.name}</div>
              <div>{element.year}</div>
              <div>{element.num_parts}</div>
              <div>{element.set_img_url}</div>
              <div>{element.set_url}</div>
              <br/>
              <br/>
          </Link>
      ))}

    </>
  );
};

export default SearchResults;

// minifigs - set_num, name, num_parts, set_img_url, set_url
// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
