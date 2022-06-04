import { useLocation } from "react-router-dom";

const SearchBar = ({ searchInput }) => {
  const location = useLocation()

  //Callback function to uplift the state
  const userInput = (searchTerm) => {
    searchInput(searchTerm);
  };
  
  // update the text according to the page
  let placeholderValue = ""
  if (location.pathname.startsWith("/findsets")) {
    placeholderValue = "LEGO Sets...";
  } else if (location.pathname.startsWith("/findminifigures")) {
    placeholderValue = "LEGO Minifigures..."
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
      <div className="mt-6 w-96 relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder={`Search for ${placeholderValue}`}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              userInput(event.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
