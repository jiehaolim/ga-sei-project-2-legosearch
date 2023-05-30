import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResultHeader from "../../components/SingleResult/ResultHeader";
import ResultFooter from "../../components/SingleResult/ResultFooter";
const API_KEY = import.meta.env.VITE_API_KEY;

const MinifigsSingleResult = ({ addToCollection }) => {
  const navigate = useNavigate();
  const { setnum } = useParams();
  const [result, setResult] = useState({
    minifig: {
      last_modified_dt: null,
      name: null,
      num_parts: null,
      set_img_url: null,
      set_num: null,
      set_url: null,
    },
    sets: {
      count: null,
      next: null,
      previous: null,
      results: [
        {
          set_num: null,
          name: null,
          num_parts: null,
          set_img_url: null,
          set_url: null,
          last_modified_dt: null,
        },
      ],
    },
  });

  // fetch data
  const fetchData = async () => {
    try {
      // fetch minifig data
      const responseMinifig = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${setnum}/?key=${API_KEY}`
      );
      const dataMinifig = await responseMinifig.json();

      // fetch set data
      const responseSets = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${setnum}/sets/?key=${API_KEY}`
      );
      const dataSets = await responseSets.json();

      // error handling for minifigures, sets
      if (!responseMinifig.ok) throw responseMinifig.status;
      if (!responseSets.ok) throw responseSets.status;

      setResult({ minifig: dataMinifig, sets: dataSets });
    } catch (error) {
      navigate(`../error/${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setnum]);

  return (
    <>
      {result.minifig.name ? (
        <ResultHeader
          result={result.minifig}
          addToCollection={addToCollection}
        />
      ) : null}
      {result.sets.count ? <ResultFooter results={result.sets} /> : null}
    </>
  );
};

export default MinifigsSingleResult;
