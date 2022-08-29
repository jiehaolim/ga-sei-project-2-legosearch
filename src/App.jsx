import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import FindMinifigures from "./pages/FindMinifigures";
import FindMinifiguresResult from "./pages/FindMinifiguresResult";
import FindSets from "./pages/FindSets";
import FindSetsResult from "./pages/FindSetsResult";
import MyCollection from "./pages/MyCollection";
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

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
      
      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Added to My Collection!
                    </Dialog.Title>
                  </div>
                </div>
                <div className=" mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}>
                    Okay
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  );
}

export default App;
