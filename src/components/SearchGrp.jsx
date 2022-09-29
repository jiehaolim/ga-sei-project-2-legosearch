import SearchBar from "../components-layout/SearchBar"

const SearchGrp = () => {
  
    const handleSubmit = () => {
    console.log("This is gonna be awesome.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <SearchBar />
          <br />
          <button>Search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchGrp;
