import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleResultMain from "../../components/SearchSingleResult/SingleResultMain";
import SingleResultSub from "../../components/SearchSingleResult/SingleResultSub";
const API_KEY = import.meta.env.VITE_API_KEY;

const SetsSingleResult = ({ themes, addToWishlist }) => {
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

      // fetch theme data
      // max data pull is 1000 but lego only have < 500 themes as now 30-Sep-22
      const pageSize = 1000;
      const responseThemes = await fetch(
        `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
      )
      const dataThemes = await responseThemes.json();
      // to show parent theme name with sub theme name
      const mainThemes = []
      for (const theme of dataThemes.results) {
        // no parent theme just push into array
        if (theme.parent_id === null) {
          mainThemes.push({value: theme.id, name:theme.name})
        } else {
          // with parent theme, find parent theme name and put together wiith subtheme name
          const parentTheme = dataThemes.results.find((element) => element.id === theme.parent_id)
          mainThemes.push({value: theme.id, name: `${parentTheme.name} > ${theme.name}`})
        }
      }

      // add theme to data set
      const themeForSets = mainThemes.find((element) => element.value === dataSets.theme_id)
      dataSets.theme = themeForSets?.name

      // fetch minifigures data
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
      {resultObj?.sets?.name === undefined ? null : <SingleResultMain resultObj={resultObj.sets} addToWishlist={addToWishlist} />}
      {resultObj?.minifigs?.count === undefined || resultObj?.minifigs?.count === 0 ? null : <SingleResultSub resultObj={resultObj.minifigs} />}
    </>
  );
};

export default SetsSingleResult;
