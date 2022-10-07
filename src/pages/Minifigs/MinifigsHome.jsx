import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchGrp from "../../components/HomeSearch/SearchGrp";
import SearchGrpAdv from "../../components/HomeSearch/SearchGrpAdv";
const API_KEY = import.meta.env.VITE_API_KEY

const MinifigsHome = () => {
  // true === simple search, false === advanced search
  const [searchType, setSearchType] = useState(true);
  const [searchObj, setSearchObj] = useState({
    term: "",
    theme: "",
  });
  const [searchAdvObj, setSearchAdvObj] = useState({
    term: "",
    theme: "",
    minParts: "0",
    maxParts: "250",
  });
  const [themes, setThemes] = useState({ "theme":[{ "value":"", "name":"Theme" }] })

  useEffect(() => {
    const fetchData = async () => {
    // max data pull is 1000 but lego only have < 500 themes as now 30-Sep-22
    const pageSize = 1000;
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
    )
    const data = await response.json();
    // to show parent theme name with sub theme name
    const mainThemes = []
    for (const theme of data.results) {
      // no parent theme just push into array
      if (theme.parent_id === null) {
        mainThemes.push({id: theme.id, name:theme.name})
      } else {
        // with parent theme, find parent theme name and put together wiith subtheme name
        const parentTheme = data.results.find((element) => element.id === theme.parent_id)
        mainThemes.push({id: theme.id, name: `${parentTheme.name} > ${theme.name}`})
      }
    }
    mainThemes.sort((a ,b) => (a.name > b.name) ? 1 : -1)
    setThemes({theme: [...themes.theme, ...mainThemes]})
    }
    fetchData()
  }, [])

  const handleChange = (key, value1, value2) => {
    if (key === "term" || key === "theme") {
      setSearchObj({ ...searchObj, [key]: value1 });
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    } else if (key === "rangeParts") {
      setSearchAdvObj({...searchAdvObj, ["minParts"]: value1, ["maxParts"]: value2});
    } else {
      setSearchAdvObj({ ...searchAdvObj, [key]: value1 });
    }
  };

  const handleSearchType = (value) => {
    setSearchType(value);
  };

  return (
    <>
      {searchType ? (<SearchGrp searchObj={searchObj} themes={themes} handleChange={handleChange} handleSearchType={handleSearchType}/>) 
      : (<SearchGrpAdv searchObj={searchAdvObj} themes={themes} handleChange={handleChange} handleSearchType={handleSearchType}/>)}
      <Outlet />
    </>
  );
};

export default MinifigsHome;
