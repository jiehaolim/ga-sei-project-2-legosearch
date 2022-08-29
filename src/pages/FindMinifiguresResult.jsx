import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultMain from "../components/ResultMain";
import ResultSub from "../components/ResultSub";
import NavBar from "../components-layout/NavBar";

const API_KEY = import.meta.env.VITE_API_KEY;

const FindMinifiguresResult = ({addItemToCollection}) => {
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

  const addDetailsToCollection = () => {
    let item = [
      { sets: [] },
      { minifigs: [{ id: dataObj.details.set_num, name: dataObj.details.name, imageURL: dataObj.details.set_img_url, qty: 1 }] }
    ]
    addItemToCollection(item)
  }
  
  return (
    <div>
      <NavBar />
      {dataObj?.details === undefined ? null : <ResultMain dataObj={dataObj} addDetailsToCollection={addDetailsToCollection}/>}
      {dataObj?.minifig.count === undefined ? null : <ResultSub dataObj={dataObj} />}
    </div>
  );
};

export default FindMinifiguresResult;
