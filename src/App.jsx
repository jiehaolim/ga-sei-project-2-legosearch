import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindMinifigures from "./pages/FindMinifigures";
import FindMinifiguresResult from "./pages/FindMinifiguresResult";
import FindSets from "./pages/FindSets";
import FindSetsResult from "./pages/FindSetsResult";
import MyCollection from "./pages/MyCollection";
import Modal from "./components-layout/Modal"

function App() {
  const [collectionObj, setCollectionObj] = useState({
    sets: [],
    minifigs: [],
  });
  
  // modal state
  const [open, setOpen] = useState(false)

  // to pass item to my collection
  const addItemToCollection = (item) => {
    const [{ sets } = { sets: [] }, { minifigs } = { minifigs: [] }] = item;

    if (sets.length && minifigs.length) {
      setCollectionObj({
        sets: [...collectionObj.sets, ...sets],
        minifigs: [...collectionObj.minifigs, ...minifigs],
      });
    } else if (minifigs.length && !sets.length) {
      setCollectionObj({
        sets: [...collectionObj.sets],
        minifigs: [...collectionObj.minifigs, ...minifigs],
      });
    } else if (sets.length && !minifigs.length) {
      setCollectionObj({
        sets: [...collectionObj.sets, ...sets],
        minifigs: [...collectionObj.minifigs],
      });
    }
    setOpen(true)
  };

  const offModalApp = (off) => {
    setOpen(off)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findsets" element={<FindSets addItemToCollection={addItemToCollection} />}/>
          <Route path="/findsets/:setnum" element={<FindSetsResult addItemToCollection={addItemToCollection} />}/>
          <Route path="/findminifigures" element={<FindMinifigures addItemToCollection={addItemToCollection} />}/>
          <Route path="/findminifigures/:setnum" element={<FindMinifiguresResult addItemToCollection={addItemToCollection} />}/>
          <Route path="/mycollection" element={<MyCollection collectionObj={collectionObj} />}/>
        </Routes>
      </BrowserRouter>
      <Modal open={open} setOpen={setOpen} offModalApp={offModalApp}/>
    </div>
  );
}

export default App;
