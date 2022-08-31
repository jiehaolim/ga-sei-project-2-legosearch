import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeNavBar from "./pages/HomeNavBar"
import HomePage from "./pages/HomePage"
import FindSets from "./pages/FindSets"
import FindSetsHome from "./pages/FindSetsHome"
import FindSetsSingleResult from "./pages/FindSetsSingleResult"
import FindSetsResults from "./pages/FindSetsResults"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomeNavBar />}>
            <Route path="/" element={<HomePage />} />
            {/* Sets */}
            <Route path="/findsets" element={<FindSets />}>
              <Route path="/findsets" element={<FindSetsHome />} />
              <Route path="/findsets/search=:searchterm/page=:pagenum" element={<FindSetsResults />} />
            </Route>
            <Route path="/findsets/result/:setnum" element={<FindSetsSingleResult />}/>
        
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
