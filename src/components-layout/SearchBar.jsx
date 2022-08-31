const SearchBar = () => {
  return (
    <div>
        <form onSubmit={handleSubmitSB}>
          <fieldset>
            <input
              type="text"
              name="search"
              id="search"
              placeholder={`Search for ${placeholderValue}`}
              value={search}
              onChange={handleChange}
              className="w-96 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </fieldset>
          <fieldset>
            <input
              type="text"
              name="search"
              id="search"
              placeholder={`Search for ${placeholderValue}`}
              value={search}
              onChange={handleChange}
              className="w-96 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </fieldset>
        </form>
    </div>
  );
};

export default SearchBar
