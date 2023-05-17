import ResultHeader from "../../components/SingleResult/ResultHeader";
import ResultFooter from "../../components/SingleResult/ResultFooter";
const API_KEY = import.meta.env.VITE_API_KEY;

const HomeSingleResult = () => {
  return (
    <>
      <ResultHeader />
      <ResultFooter />
    </>
  );
};

export default HomeSingleResult;
