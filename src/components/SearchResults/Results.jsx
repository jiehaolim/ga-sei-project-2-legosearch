import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ModalAdd from "../Shared/ModalAdd";
import ModalAddSetsBuild from "../Shared/ModalAddSetsBuild";
import ModalSuccess from "../Shared/ModalSuccess";
import noImageAvailable from "../../img/noImageAvail.png";
const API_KEY = import.meta.env.VITE_API_KEY;

const Results = ({ resultsObj, addToCollection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get("pageNo") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "20";
  const lastPageNo = Math.ceil(resultsObj?.count / pageSize).toString();

  // computation of number of results
  const startNumResults =
    pageNo === "1" ? 1 : 1 + parseInt(pageSize) * (parseInt(pageNo) - 1);
  const endNumResults =
    lastPageNo === pageNo
      ? resultsObj?.count
      : resultsObj?.results.length * parseInt(pageNo);

  // modal sets codes
  const [modalAdd, setModalAdd] = useState({
    viewModal: false,
    set: {
      name: null,
      set_num: null,
    },
    minifig: {
      name: null,
      set_num: null,
    },
  });
  const [modalAddSetsBuild, setModalAddSetsBuild] = useState({
    viewModal: false,
    set: {
      name: null,
      set_num: null,
    },
    minifig: [
      {
        id: null,
        set_num: null,
        set_name: null,
        quantity: null,
        set_img_url: null,
      },
    ],
  });

  const turnOnModal = async (item) => {
    if (location.pathname.startsWith("/minifigures")) {
      setModalAdd({ viewModal: true, minifig: item });
    } else {
      try {
        // fetch data
        const responseMinifig = await fetch(
          `https://rebrickable.com/api/v3/lego/sets/${item.set_num}/minifigs/?key=${API_KEY}`
        );
        const dataMinifig = await responseMinifig.json();
        // error handling for minifigs
        if (!responseMinifig.ok) throw responseMinifig.status;
        // check if sets contains minifigs or not and open the respective modal
        if (dataMinifig.count === 0) {
          setModalAdd({ viewModal: true, set: item });
        } else {
          // add an related set to the related minfigures and a original_quantity
          dataMinifig.results.forEach((element) => {
            element.related_set = item.set_num;
            element.quantity_per_related_set = element.quantity;
          });
          setModalAddSetsBuild({
            viewModal: true,
            set: item,
            minifig: dataMinifig.results,
          });
        }
      } catch (error) {
        navigate(`../error/${error}`);
      }
    }
  };

  const handleModalAddSetsBuild = (key) => {
    // turn off modal
    modalAdd.viewModal ? setModalAdd({ ...modalAdd, viewModal: false }) : null;
    modalAddSetsBuild.viewModal
      ? setModalAddSetsBuild({ ...modalAddSetsBuild, viewModal: false })
      : null;
    if (key) {
      if (key === "set") {
        // add a quantity to the set
        modalAdd.set.quantity = 1;
        // pass the information app.jsx
        addToCollection(key, modalAdd.set);
      } else if (key === "minifig") {
        // add a quantity to the set
        modalAdd.minifig.quantity = 1;
        // pass the information app.jsx
        addToCollection(key, modalAdd.minifig);
      } else if (key === "setWithMinifigs") {
        // add a quantity to the set
        modalAddSetsBuild.set.quantity = 1;
        // pass the information app.jsx
        addToCollection(key, modalAddSetsBuild);
      } else if (key === "build") {
        // add a quantity to the set
        modalAddSetsBuild.set.quantity = 1;
        // pass the information app.jsx
        addToCollection(key, modalAddSetsBuild.set);
      }
      // turn on success modal after 0.5 seconds to avoid css transition clashing
      if (key === "setWithMinifigs") {
        setTimeout(() => {
          setModalSuccess({ viewModal: true, tab: "set" });
        }, 500);
      } else {
        setTimeout(() => {
          setModalSuccess({ viewModal: true, tab: key });
        }, 500);
      }
    }
  };

  // modal success codes
  const [modalSuccess, setModalSuccess] = useState({
    viewModal: false,
    tab: null,
  });

  const handleModalSuccess = (boolean) => {
    setModalSuccess({ ...modalSuccess, viewModal: boolean });
  };

  return (
    <>
      <div className="mt-8 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Showing {startNumResults.toLocaleString()} {" to "}{" "}
          {endNumResults.toLocaleString()} {" of "}{" "}
          {resultsObj?.count.toLocaleString()}
          {resultsObj?.count === 1 ? " result" : " results"}
        </h2>
        <div className="mt-8 mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resultsObj?.results.map((result) => (
            <div
              key={result.set_num}
              className="bg-white border border-gray-300 rounded-lg relative p-4"
            >
              <div className="group relative">
                <div className="w-full h-48 sm:h-64 lg:h-64 xl:h-72 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={result.set_img_url ?? noImageAvailable}
                    alt={result.name}
                    className="h-full w-full object-contain bg-white object-center"
                  />
                </div>
                <div className="pb-4 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    <Link
                      to={
                        location.pathname.startsWith("/minifigures")
                          ? "/minifigures/result/" + result.set_num
                          : "/result/" + result.set_num
                      }
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {result.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex justify-between gap-x-4">
                    <p className="text-sm text-gray-500 truncate">
                      {result.set_num}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {result.num_parts.toLocaleString()}{" "}
                      {result.num_parts <= 1 ? "part" : "parts"}
                    </p>
                  </div>
                  {location.pathname.startsWith("/minifigures") ? null : (
                    <div className="mt-1 flex justify-between gap-x-4">
                      <p className="text-sm text-gray-500 truncate">
                        {result.theme}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {result.year}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => {
                  turnOnModal(result);
                }}
              >
                Add to Collection
              </button>
            </div>
          ))}
        </div>
      </div>
      <ModalAdd
        modalAdd={modalAdd}
        handleModalAddSetsBuild={handleModalAddSetsBuild}
      />
      <ModalAddSetsBuild
        modalAddSetsBuild={modalAddSetsBuild}
        handleModalAddSetsBuild={handleModalAddSetsBuild}
      />
      <ModalSuccess
        modalSuccess={modalSuccess}
        handleModalSuccess={handleModalSuccess}
      />
    </>
  );
};

export default Results;
