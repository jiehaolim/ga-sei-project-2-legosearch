import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeNavBar from "./pages/Home/HomeNavBar";
import HomePage from "./pages/Home/HomePage";
import HomeSearchResults from "./pages/Home/HomeSearchResults";
import HomeSingleResult from "./pages/Home/HomeSingleResult";
import MinifigsHomePage from "./pages/Minifigs/MinifigsHomePage";
import MinifigsSearchResults from "./pages/Minifigs/MinifigsSearchResults";
import MinifigsSingleResult from "./pages/Minifigs/MinifigsSingleResult";
import MyCollection from "./pages/MyCollection/MyCollection";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [themes, setThemes] = useState({ "theme": [{ "id":"", "name":"Theme" }] })

  useEffect(() => {
    const fetchData = async () => {
      // fetch theme data
      // max data pull is 1000 but lego only have < 500 themes as now 3-April-23
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
    };
    fetchData();
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar for whole website */}
          <Route path="/" element={<HomeNavBar />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            <Route path="search" element={<HomeSearchResults themes={themes} />} />
            <Route path="result/:setnum" element={<HomeSingleResult />} />

            {/* Minifigs */}
            <Route path="minifigures" element={<MinifigsHomePage />} />
            <Route path="minifigures/search" element={<MinifigsSearchResults themes={themes} />} />
            <Route path="minifigures/result/:setnum" element={<MinifigsSingleResult />} />

            {/* My Collection */}
            <Route path="mycollection" element={<MyCollection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
