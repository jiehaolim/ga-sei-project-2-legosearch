import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResultHeader from "../../components/SingleResult/ResultHeader";
import ResultFooter from "../../components/SingleResult/ResultFooter";
const API_KEY = import.meta.env.VITE_API_KEY;

const HomeSingleResult = () => {
  const navigate = useNavigate();
  const { setnum } = useParams();
  const [result, setResult] = useState({
    set: {
      last_modified_dt: null,
      name: null,
      num_parts: null,
      set_img_url: null,
      set_num: null,
      set_url: null,
      theme: null, // added manually when fetching data
      theme_id: null,
      year: null,
    },
    minifigs: {
      count: null,
      next: null,
      previous: null,
      results: [
        {
          id: null,
          set_num: null,
          set_name: null,
          quantity: null,
          set_img_url: null,
        },
      ],
    },
  });

  // fetch data
  const fetchData = async () => {
    try {
      // fetch theme data
      // max data pull is 1000 but lego only have < 500 themes as now 3-April-23
      const pageSize = 1000;
      const responseThemes = await fetch(
        `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
      );
      const dataThemes = await responseThemes.json();

      // fetch set data
      const responseSet = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${setnum}/?key=${API_KEY}`
      );
      const dataSet = await responseSet.json();

      // fetch minifig data
      const responseMinifigs = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${setnum}/minifigs/?key=${API_KEY}`
      );
      const dataMinifigs = await responseMinifigs.json();

      // error handling for themes
      if (!responseThemes.ok) throw responseThemes.status;

      // to show parent theme name with sub theme name
      const mainThemes = [];
      for (const theme of dataThemes.results) {
        // no parent theme just push into array
        if (theme.parent_id === null) {
          mainThemes.push({ id: theme.id, name: theme.name });
        } else {
          // with parent theme, find parent theme name and put together wiith subtheme name
          const parentTheme = dataThemes.results.find(
            (element) => element.id === theme.parent_id
          );
          mainThemes.push({
            id: theme.id,
            name: `${parentTheme.name} > ${theme.name}`,
          });
        }
      }

      // error handling for set, minifigures
      if (!responseSet.ok) throw responseSet.status;
      if (!responseMinifigs.ok) throw responseMinifigs.status;

      // add theme to the set information
      const setThemeName = mainThemes.find(
        (element) => element.id === dataSet.theme_id
      );
      dataSet.theme = setThemeName.name;

      setResult({ set: dataSet, minifigs: dataMinifigs });
    } catch (error) {
      navigate(`../error/${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setnum]);

  console.log(result.set);
  console.log(result.minifigs);

  return (
    <>
      {result.set.name ? <ResultHeader result={result.set} /> : null}
      {result.minifigs.count ? <ResultFooter results={result.minifigs} /> : null}
    </>
  );
};

export default HomeSingleResult;
