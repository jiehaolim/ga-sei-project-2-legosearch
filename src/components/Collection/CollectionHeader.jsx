const CollectionHeader = () => {
  return (
    <div className="mt-8 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Collection
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Get started by searching for LEGO sets or minifigures and add it to
            collection. You can export the collated collection into Excel.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export into Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
