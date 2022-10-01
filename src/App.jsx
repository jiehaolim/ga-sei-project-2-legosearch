import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeNavBar from "./pages/Home/HomeNavBar";
import HomePage from "./pages/Home/HomePage";
import SetsHome from "./pages/Sets/SetsHome";
import SetsHomeBody from "./pages/Sets/SetsHomeBody";
import SetsSearch from "./pages/Sets/SetsSearch";
import SetsSingleResult from "./pages/Sets/SetsSingleResult";
import MinifigsHome from "./pages/Minifigs/MinifigsHome";
import MinifigsHomeBody from "./pages/Minifigs/MinifigsHomeBody";
import MinifigsSearch from "./pages/Minifigs/MinifigsSearch";
import MinifigsSingleResults from "./pages/Minifigs/MinifigsSingleResult";
import WishlistHome from "./pages/Wishlist/WishlistHome";

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
              <Route path="" element={<SetsHomeBody />} />
              <Route path="search" element={<SetsSearch />} />
              <Route path="result/:setnum" element={<SetsSingleResult />}/>
            </Route>
            
            
            {/* Minifigures */}
            <Route path="minifigures" element={<MinifigsHome />}>
              <Route path="" element={<MinifigsHomeBody />} />
              <Route path="search" element={<MinifigsSearch />} />
              <Route path="result/:setnum" element={<MinifigsSingleResults />}/>
            </Route>
            
            {/* Wishlist */}
            <Route path="wishlist" element={<WishlistHome />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
