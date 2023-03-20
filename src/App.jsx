import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeNavBar from "./pages/Home/HomeNavBar";
import HomePage from "./pages/Home/HomePage";
import SetsHome from "./pages/Sets/SetsHome";
import SetsSearchResults from "./pages/Sets/SetsSearchResults";
import SetsSingleResult from "./pages/Sets/SetsSingleResult";
import MinifigsHome from "./pages/Minifigs/MinifigsHome";
import MinifigsSearchResults from "./pages/Minifigs/MinifigsSearchResults";
import MinifigsSingleResult from "./pages/Minifigs/MinifigsSingleResult";
import MyCollection from "./pages/MyCollection/MyCollection";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar for whole website */}
          <Route path="/" element={<HomeNavBar />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Sets */}
            <Route path="sets" element={<SetsHome />}>
              <Route path="search" element={<SetsSearchResults />} />
              <Route path="result/:setnum" element={<SetsSingleResult />} />
            </Route>

            {/* Minifigs */}
            <Route path="minifigs" element={<MinifigsHome />}>
              <Route path="search" element={<MinifigsSearchResults />} />
              <Route path="result/:setnum" element={<MinifigsSingleResult />} />
            </Route>

            {/* My Collection */}
            <Route path="mycollection" element={<MyCollection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
