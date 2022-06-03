import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const Result = () => {
  const params = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/${params}/?key=${API_KEY}`
      );
      const data = await response.json();
      setResults(data);
    };
    fetchData();
    console.log(setData())
  }, []);

  return (
    <>
      <p>testing</p>
    </>
  );
};

export default Result;
