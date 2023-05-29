import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const API_KEY = import.meta.env.VITE_API_KEY;

const ModalSets = ({ modalSets, handleModalSets }) => {
  const [minifigInfo, setMinifigInfo] = useState({
    count: null,
  });

  const turnOffModalSets = (key, boolean) => {
    setMinifigInfo({ count: null });
    handleModalSets(key, boolean);
  };

  const fetchData = async () => {
    const responseMinifigs = await fetch(
      `https://rebrickable.com/api/v3/lego/sets/${modalSets.information.set_num}/minifigs/?key=${API_KEY}`
    );
    const dataResponse = await responseMinifigs.json();
    setMinifigInfo({ count: dataResponse.count });
  };

  useEffect(() => {
    fetchData();
  }, [modalSets.information.set_num]);

  return (
    <Transition.Root show={modalSets.viewModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalSets}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add{" "}
                      {modalSets.information.set_num +
                        " " +
                        modalSets.information.name}{" "}
                      to Collection?
                    </Dialog.Title>
                    {minifigInfo.count === null ? null : minifigInfo.count === 0 ? null : (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Do you want to add the complete set including
                          minifigures or just the build itself?
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {minifigInfo.count === null ? null : minifigInfo.count === 0 ? (
                  <div className="mt-5 sm:mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-1"
                      onClick={() => {
                        turnOffModalSets("set", false);
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-2 sm:mt-0"
                      onClick={() => turnOffModalSets("cancel", false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 sm:mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-1 sm:mt-0"
                      onClick={() => turnOffModalSets("set", false)}
                    >
                      Complete Set
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 sm:mt-0"
                      onClick={() => turnOffModalSets("build", false)}
                    >
                      Build Only
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-3 sm:mt-0"
                      onClick={() => turnOffModalSets("cancel", false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalSets;
