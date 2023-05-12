const InvalidParam = () => {
  return (
    <div className="mt-8 mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-blue-600">
        Error 404
      </h2>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
        Invalid search parameters
      </h1>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Please check your search parameters again.
      </p>
    </div>
  );
};

export default InvalidParam;
