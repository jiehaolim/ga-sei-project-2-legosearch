import DropDownList from "../components-layout/DropDownList";

const SearchGrp = () => {
  
    const handleSubmit = () => {
    console.log("This is gonna be awesome.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            type="text"
            placeholder="Search for LEGO sets"
            name="search"
            id="search"
            value=""
            onChange={() => handleChange(event, "search")}
          />
          <DropDownList />
          <br />
          <button>Search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchGrp;
