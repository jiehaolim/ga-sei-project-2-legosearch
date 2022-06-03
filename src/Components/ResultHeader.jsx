const ResultHeader = ({ dataObj }) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto py-2 px-16 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {dataObj?.details?.set_num + " " + dataObj?.details?.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {dataObj?.details?.year}
              </p>
              <p className="text-lg text-gray-900 sm:text-xl"></p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                {dataObj?.details?.num_parts} pieces
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={dataObj?.details?.set_img_url}
              alt={dataObj?.details?.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product form */}
        <form>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Add to my collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultHeader;
