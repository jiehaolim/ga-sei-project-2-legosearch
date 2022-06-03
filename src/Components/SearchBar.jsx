const SearchBar = ({ placeholderValue, searchInput }) => {

  //Callback function to uplift the state
  const userInput = (searchTerm, pageNo) => {
    searchInput(searchTerm, 1);
  };
  
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
