const Home = () => {
  return (
    <div>
      <div className="relative">
            <div aria-hidden="true" className="hidden absolute w-1/2 h-full lg:block" />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="max-w-2xl mx-auto py-2 px-2 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                      LEGO Search
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      LEGO means play well.
                    </p>
                    <p className="mt-4 text-xl text-gray-600">
                      Start searching LEGO by sets or minifigures.
                    </p>
                    <p className="mt-4 text-xl text-gray-600">
                      You can also create your own collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Home;
