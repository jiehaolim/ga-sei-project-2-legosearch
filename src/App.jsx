import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import FindMinifigures from "./Pages/FindMinifigures"
import FindSets from "./Pages/FindSets"
import MyCollection from "./Pages/MyCollection"
import SetsResult from "./Pages/SetsResult"

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findsets" element={<FindSets />} />
            <Route path="/findsets/:setnum" element={<SetsResult />} />
            <Route path="/findminifigures" element={<FindMinifigures />} /> 
            <Route path="/findminifigures/:setnum" element={<SetsResult />} />     
            <Route path="/mycollection" element={<MyCollection />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
