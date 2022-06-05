import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import MainResult from "../Components/MainResult";
import SubResult from "../Components/SubResult";

const API_KEY = import.meta.env.VITE_API_KEY;

const SetsResult = ({addItemToCollection}) => {
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
      <NavBar />
      {dataObj?.details?.name === undefined ? null : <MainResult dataObj={dataObj} addDetailsToCollection={addDetailsToCollection}/>}
      {dataObj?.minifig?.count === undefined || dataObj?.minifig?.count === 0 ? null : <SubResult dataObj={dataObj}/>}
    </div>
  );
};

export default SetsResult;