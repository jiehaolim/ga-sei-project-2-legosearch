import { Link, useLocation } from "react-router-dom";

const SearchResults = ({ result }) => {
  const location = useLocation()
  let path = ""
  // update the URL per location
  if (location.pathname.startsWith("/sets")) {
    path = "/sets/result"
  } else if (location.pathname.startsWith("/minifigures")) {
    path = "/minifigures/result"
  }

  return (
    <>
      <div>main results</div>
      {result.results.map((element) => (
        <Link key={element.set_num} to={`/sets/result/${element.set_num}`}>
              <div>{element.set_num}</div>
              <div>{element.name}</div>
              <div>{element.year}</div>
              <div>{element.num_parts}</div>
              <div>{element.set_img_url}</div>
              <br/>
              <br/>
          </Link>
      ))}

    </>
  );
};

export default SearchResults;
