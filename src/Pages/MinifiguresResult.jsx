import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import MainResult from "../Components/MainResult";
import SubResult from "../Components/SubResult";

const API_KEY = import.meta.env.VITE_API_KEY;

const MinifiguresResult = () => {
  const params = useParams();
  const [dataObj, setDataObj] = useState({
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

      setDataObj({
        details: dataDetails,
        minifig: dataMinifig,
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      {dataObj?.details === undefined ? null : <MainResult dataObj={dataObj}/>}
      {dataObj?.minifig.count === undefined ? null : <SubResult dataObj={dataObj}/>}
    </div>
  );
};

export default MinifiguresResult;
