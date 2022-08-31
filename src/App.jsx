import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeNavBar from "./pages/Home/HomeNavBar";
import HomePage from "./pages/Home/HomePage";
import SetsHome from "./pages/Sets/SetsHome";
import SetsHomeBody from "./pages/Sets/SetsHomeBody";
import SetsResults from "./pages/Sets/SetsResults";
import SetsSingleResult from "./pages/Sets/SetsSingleResult";
import MinifigsHome from "./pages/Minifigs/MinifigsHome";
import MinifigsHomeBody from "./pages/Minifigs/MinifigsHomeBody";
import MinifigsResults from "./pages/Minifigs/MinifigsResults";
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
            <Route path="/sets" element={<SetsHome />}>
              <Route path="/sets" element={<SetsHomeBody />} />
              <Route path="/sets/search=:searchterm/page=:pagenum" element={<SetsResults />} />
            </Route>
            <Route path="/sets/result/:setnum" element={<SetsSingleResult />}/>
            
            {/* Minifigures */}
            <Route path="/minifigures" element={<MinifigsHome />}>
              <Route path="/minifigures" element={<MinifigsHomeBody />} />
              <Route path="/minifigures/search=:searchterm/page=:pagenum" element={<MinifigsResults />} />
            </Route>
            <Route path="/minifigures/result/:setnum" element={<MinifigsSingleResults />}/>
            
            {/* Wishlist */}
            <Route path="/wishlist" element={<WishlistHome />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
