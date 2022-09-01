import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_API_KEY

const DropDownList = () => {
  const [themes, setThemes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    // max data pull is 1000 but lego only have 446 themes as now 1-Sep-22
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
    <select name="themes" id="themes">
      <option value="theme" key="theme">Theme</option>
      {themes.map((theme, index) => <option value={theme.name} key={index}>{theme.name}</option>)} 
    </select>
  );
};

export default DropDownList
