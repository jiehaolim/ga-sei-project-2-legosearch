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

function App() {
  const [collection, setCollection] = useState({
    set: [],
    setMinifig: [],
    build: [],
    minifig: [],
  });

  const addToCollection = (key, itemObj) => {
    if (key === "setWithMinifigs") {
      // find if item exists
      const index = collection["set"].findIndex(
        (element) => element.set_num === itemObj["set"].set_num
      );
      // if exists
      if (index >= 0) {
        setCollection({
          ...collection,
          ["set"]: collection["set"].map((element) =>
            element.set_num === itemObj["set"].set_num
              ? {
                  ...element,
                  quantity: (element.quantity =
                    element.quantity + itemObj["set"].quantity),
                }
              : element
          ),
          // match array against array
          ["setMinifig"]: collection["setMinifig"].map((element) => {
            const findItem = itemObj["minifig"].find(
              (item) =>
                item.related_set === element.related_set &&
                item.set_num === element.set_num
            );
            return {
              ...element,
              quantity: (element.quantity =
                element.quantity + findItem.quantity),
            };
          }),
        });
        // if it does not exist
      } else {
        setCollection({
          ...collection,
          ["set"]: [...collection["set"], itemObj["set"]],
          ["setMinifig"]: [...collection["setMinifig"], ...itemObj["minifig"]],
        });
      }
    } else {
      // find if item exists
      const index = collection[key].findIndex(
        (element) => element.set_num === itemObj.set_num
      );
      // if exists
      if (index >= 0) {
        setCollection({
          ...collection,
          [key]: collection[key].map((element) =>
            element.set_num === itemObj.set_num
              ? {
                  ...element,
                  quantity: (element.quantity =
                    element.quantity + itemObj.quantity),
                }
              : element
          ),
        });
        // if it does not exist
      } else {
        setCollection({ ...collection, [key]: [...collection[key], itemObj] });
      }
    }
  };

  console.log(collection);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* NavBar for whole website */}
          <Route path="/" element={<HomeNavBar />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="search"
              element={<HomeSearchResults addToCollection={addToCollection} />}
            />
            <Route
              path="result/:setnum"
              element={<HomeSingleResult addToCollection={addToCollection} />}
            />

            {/* Minifigs */}
            <Route path="minifigures" element={<MinifigsHomePage />} />
            <Route
              path="minifigures/search"
              element={<MinifigsSearchResults addToCollection={addToCollection} />}
            />
            <Route
              path="minifigures/result/:setnum"
              element={<MinifigsSingleResult addToCollection={addToCollection} />}
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
