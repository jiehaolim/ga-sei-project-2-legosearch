import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleResultMain from "../../components/SearchSingleResult/SingleResultMain";
import SingleResultSub from "../../components/SearchSingleResult/SingleResultSub";
const API_KEY = import.meta.env.VITE_API_KEY;

const MinifigsSingleResults = () => {
  const params = useParams()
  const [resultObj, setResultObj] = useState({
    sets: "",
    minifigs: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const responseMinifigs = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${params.setnum}/?key=${API_KEY}`
      );
      const dataMinifigs = await responseMinifigs.json();

      const responseSets = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${params.setnum}/sets/?key=${API_KEY}`
      );
      const dataSets = await responseSets.json();

      setResultObj({
        minifigs: dataMinifigs,
        sets: dataSets,
      });
    };
    fetchData();
  }, []);  
  
  return (
    <>
      <h2>Minifigures Single Results</h2>
      {resultObj?.minifigs?.name === undefined ? null : <SingleResultMain resultObj={resultObj} />}
      {resultObj?.sets?.count === undefined || resultObj?.sets?.count === 0 ? null : <SingleResultSub resultObj={resultObj} />}
    </>
  );
};

export default MinifigsSingleResults;
