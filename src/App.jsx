import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeNavBar from "./pages/Home/HomeNavBar";
import HomePage from "./pages/Home/HomePage";
import HomeSearchResults from "./pages/Home/HomeSearchResults";
import HomeSingleResult from "./pages/Home/HomeSingleResult";
import MinifigsHomePage from "./pages/Minifigs/MinifigsHomePage";
import MinifigsSearchResults from "./pages/Minifigs/MinifigsSearchResults";
import MinifigsSingleResult from "./pages/Minifigs/MinifigsSingleResult";
import Collection from "./pages/Collection/Collection";
import Error from "./pages/Error/Error";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar for whole website */}
          <Route path="/" element={<HomeNavBar />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            <Route path="search" element={<HomeSearchResults />} />
            <Route path="result/:setnum" element={<HomeSingleResult />} />

            {/* Minifigs */}
            <Route path="minifigures" element={<MinifigsHomePage />} />
            <Route
              path="minifigures/search"
              element={<MinifigsSearchResults />}
            />
            <Route
              path="minifigures/result/:setnum"
              element={<MinifigsSingleResult />}
            />

            {/* Collection */}
            <Route path="collection" element={<Collection />} />

            {/* Error */}
            <Route path="error/:id" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
