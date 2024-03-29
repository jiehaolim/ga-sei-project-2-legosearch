import { useLocation, Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import smileyLogo from "../../img/logos/smileylogo.png";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Minifigures", to: "/minifigures" },
  { name: "Collection", to: "/collection" },
];

const NavBar = () => {
  const location = useLocation();
  return (
    <Disclosure as="nav" className="bg-red-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={smileyLogo}
                      alt="LEGO Search"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={smileyLogo}
                      alt="LEGO Search"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, itemID) => (
                      <Link
                        key={itemID}
                        to={item.to}
                        className={
                          item.to === location.pathname
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-white hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item, itemID) => (
                <Link to={item.to} key={itemID}>
                  <Disclosure.Button
                    as="a"
                    className={
                      item.to === location.pathname
                        ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                        : "text-white hover:bg-yellow-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
