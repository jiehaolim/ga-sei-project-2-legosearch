import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalAdd from "../Shared/ModalAdd";
import ModalAddSetsBuild from "../Shared/ModalAddSetsBuild";
import ModalSuccess from "../Shared/ModalSuccess";
import noImageAvailable from "../../img/noImageAvail.png";
const API_KEY = import.meta.env.VITE_API_KEY;

const ResultHeader = ({ result, addToCollection }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // bread crumbs
  const breadcrumbs = [
    {
      id: 1,
      name: location.pathname.startsWith("/minifigures")
        ? "Minifigures"
        : "Home",
      to: location.pathname.startsWith("/minifigures") ? "/minifigures" : "/",
    },
    {
      id: 2,
      name: "Results",
      to: -1,
    },
  ];

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
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <Link
                      to={breadcrumb.to}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* LEGO details */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {result.set_num + " " + result.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Lego set information
            </h2>

            {location.pathname.startsWith("/minifigures") ? null : (
              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  Year released: {result.year}
                </p>
              </div>
            )}

            {location.pathname.startsWith("/minifigures") ? null : (
              <div className="mt-4 font-base text-gray-500">
                Theme: {result.theme}
              </div>
            )}

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                No of parts: {result.num_parts}{" "}
                {result.num_parts > 1 ? "parts" : "part"}
              </p>
            </div>
          </section>
        </div>

        {/* LEGO image */}
        <div className="mt-8 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={result.set_img_url ? result.set_img_url : noImageAvailable}
              alt={result.name}
              className="h-full w-full object-contain bg-white object-center"
            />
          </div>
        </div>

        {/* LEGO form */}
        <div className="mt-6 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              LEGO options
            </h2>
            <div className="grid sm:grid-col-2 gap-y-4 gap-x-2 auto-cols-fr grid-cols-1">
              <div className="sm:col-start-1 sm:col-span-1">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={() => {
                    turnOnModal(result);
                  }}
                >
                  Add to Collection
                </button>
              </div>
              <div className="sm:col-start-2 sm:col-span-1 sm:col-end-2">
                <a
                  href={result.set_url}
                  target="_blank"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  View on Rebrickable
                </a>
              </div>
            </div>
          </section>
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

export default ResultHeader;
