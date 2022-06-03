import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import FindMinifigures from "./Pages/FindMinifigures"
import FindSets from "./Pages/FindSets"
import MyCollection from "./Pages/MyCollection"
import SetsResult from "./Components/SetsResult"

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/FindSets" element={<FindSets />} />
            <Route path="/FindSets/:setnum" element={<SetsResult />} />
            <Route path="/FindMinifigures" element={<FindMinifigures />} />      
            <Route path="/MyCollection" element={<MyCollection />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
