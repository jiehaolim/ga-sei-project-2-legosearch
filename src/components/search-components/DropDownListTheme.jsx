import { useEffect, useState } from "react"

const DropDownListTheme = ({ searchObj, handleChange }) => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const [themes, setThemes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    // max data pull is 1000 but lego only have < 500 themes as now 30-Sep-22
    const pageSize = 1000;
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
    )
    const data = await response.json();
    // only show the main themes, filter away sub themes with parent_id null
    const mainThemes = data.results.filter((element) => element.parent_id === null).sort((a, b) => (a.name > b.name) ? 1 : -1)
    setThemes(mainThemes)
    }
    fetchData()
  }, [])
  
  return (
    <select name="themes" value={searchObj.theme} onChange={() => {handleChange("theme", event.target.value, "")}}>
      <option value="" key="theme">Theme</option>
      {themes.map((theme, index) => <option value={theme.id} key={index}>{theme.name}</option>)} 
    </select>
  );
};

export default DropDownListTheme
