import { useState } from "react"
import { useLocation, Navigate, useNavigate } from "react-router-dom"

const SearchBar = ({ handleSubmit }) => {
  const [search, setSearch] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  
  // update the text according to the page
  let placeholderValue = ""
  if (location.pathname.startsWith("/findsets")) {
    placeholderValue = "LEGO Sets..."
  } else if (location.pathname.startsWith("/findminifigures")) {
    placeholderValue = "LEGO Minifigures..."
  }

  // controlled form for search bar
  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  
  // uplift the state to the parent
  const handleSubmitSB = (event) => {
    event.preventDefault()
    if (location.pathname.startsWith("/findsets")) {
      navigate(`/findsets/search=${search}/page=1`)
    } else if (location.pathname.startsWith("/findminifigures")) {
      navigate(`/findminifigures/search=${search}/page=1`)
    }
    setSearch("")
  }

  return (
    <div className="max-w-2xl mx-auto py-2 px-2 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 w-96 relative flex items-center">
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
        </form>
      </div>
    </div>
  );
};

export default SearchBar
