import { Link, useParams } from "react-router-dom";
import wrongrequest from "../../img/error/wrongrequest400.jpeg";
import unauthorised from "../../img/error/unauthorised401.jpeg";
import forbidden from "../../img/error/forbidden403.jpeg";
import pagenotfound from "../../img/error/pagenotfound404.jpeg";
import toomanyrequests from "../../img/error/toomanyrequests429.jpeg";

const Error = () => {
  const { id } = useParams();

  const errorObj = {
    400: {
      img: wrongrequest,
      h1: "Invalid search parameters.",
      p: "Please check your search parameters again.",
    },
    401: {
      img: unauthorised,
      h1: "Unauthorized. Your API key is invalid.",
      p: "Please contact the site administrator.",
    },
    403: {
      img: forbidden,
      h1: "Forbidden. You do not have access on the requested item.",
      p: "Please contact the site administrator.",
    },
    404: {
      img: pagenotfound,
      h1: "Page not found.",
      p: "The page you are looking for doesn't exist.",
    },
    429: {
      img: toomanyrequests,
      h1: "Too many requests received.",
      p: "We're sorry, but you have sent too many requests to us recently. Please try again later",
    },
  };

  return (
    <main className="mt-8 mx-auto max-w-md sm:mt-16 sm:max-w-3xl">
      <div className="text-center">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="mx-auto h-56 w-auto sm:h-80"
            src={errorObj[id].img}
            alt={"Error " + id}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="mt-4 text-3xl font-bold text-blue-600">{"Error " + id}</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
          {errorObj[id].h1}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {errorObj[id].p}
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to={"/"}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go back to Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
