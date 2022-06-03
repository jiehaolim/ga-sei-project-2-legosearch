import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import ResultHeader from "../Components/ResultHeader";
import ResultFooter from "../Components/ResultFooter";

const API_KEY = import.meta.env.VITE_API_KEY;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SetsResult = () => {
  const params = useParams();
  const [setsDataObj, setSetsDataObj] = useState({
    details: "",
    minifig: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseDetails = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${params.setnum}/?key=${API_KEY}`
      );
      const dataDetails = await responseDetails.json();

      const responseMinifig = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${params.setnum}/sets/?key=${API_KEY}`
      );
      const dataMinifig = await responseMinifig.json();

      setSetsDataObj({
        details: dataDetails,
        minifig: dataMinifig,
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      {setsDataObj?.details?.count === undefined ? null : <ResultHeader setsDataObj={setsDataObj}/>}
      {setsDataObj?.minifig?.name === undefined ? null : <ResultFooter setsDataObj={setsDataObj}/>}
    </div>
  );
};

export default SetsResult;
