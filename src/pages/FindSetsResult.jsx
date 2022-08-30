import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultMain from "../components/ResultMain";
import ResultSub from "../components/ResultSub";

const API_KEY = import.meta.env.VITE_API_KEY;

const FindSetsResult = ({addItemToCollection}) => {
  const params = useParams();
  const [dataObj, setDataObj] = useState({
    details: "",
    minifig: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseDetails = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${params.setnum}/?key=${API_KEY}`
      );
      const dataDetails = await responseDetails.json();

      const responseMinifig = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${params.setnum}/minifigs/?key=${API_KEY}`
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
    let minifigArray = [];
    for (const element of dataObj.minifig.results) {
      minifigArray.push({id: element.set_num, name: element.set_name, imageURL: element.set_img_url, qty: element.quantity,});
    }
    let item = [
      { sets: [{ id: dataObj.details.set_num, name: dataObj.details.name, imageURL: dataObj.details.set_img_url, qty: 1 }] },
      { minifigs: minifigArray },
    ];
    addItemToCollection(item)
  }
  
  return (
    <div>
      {dataObj?.details?.name === undefined ? null : <ResultMain dataObj={dataObj} addDetailsToCollection={addDetailsToCollection}/>}
      {dataObj?.minifig?.count === undefined || dataObj?.minifig?.count === 0 ? null : <ResultSub dataObj={dataObj}/>}
    </div>
  );
};

export default FindSetsResult;