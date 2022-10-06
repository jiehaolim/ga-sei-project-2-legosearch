import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleResultMain from "../../components/SearchSingleResult/SingleResultMain";
import SingleResultSub from "../../components/SearchSingleResult/SingleResultSub";
const API_KEY = import.meta.env.VITE_API_KEY;

const SetsSingleResult = () => {
  const params = useParams()
  const [resultObj, setResultObj] = useState({
    sets: "",
    minifigs: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const responseSets = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${params.setnum}/?key=${API_KEY}`
      );
      const dataSets = await responseSets.json();

      const responseMinifigs = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${params.setnum}/minifigs/?key=${API_KEY}`
      );
      const dataMinifigs = await responseMinifigs.json();

      setResultObj({
        sets: dataSets,
        minifigs: dataMinifigs,
      });
    };
    fetchData();
  }, []);  

  return (
    <>
      <div>Single result</div>
      {resultObj?.sets?.name === undefined ? null : <SingleResultMain resultObj={resultObj.sets} />}
      {resultObj?.minifigs?.count === undefined || resultObj?.minifigs?.count === 0 ? null : <SingleResultSub resultObj={resultObj.minifigs} />}
    </>
  );
};

export default SetsSingleResult;
