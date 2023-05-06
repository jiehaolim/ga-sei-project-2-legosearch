import sadlegoface from "../../img/sadlegoface.jpg";

const ErrorPage = () => {
  return (
    <main className="mt-8 mx-auto max-w-md sm:mt-16 sm:max-w-3xl">
      <div className="text-center">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="mx-auto h-56 w-auto sm:h-80"
            src={sadlegoface}
            alt="LEGO Search"
          />
        </div>
      </div>
      <div className="text-center">
        <p className="mt-4 text-3xl font-bold text-blue-600">Error 429</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Too many request received
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We're sorry, but you have sent too many requests to us recently. Please try again later.
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
