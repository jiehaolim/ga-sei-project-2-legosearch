import Search from "../../components/Search";
import RecommendedGrid from "../../components/RecommendedGrid";

const searchTitle = "minifigures"

const MinifigsHome = () => {
    
    return (
        <>
            <Search searchTitle={searchTitle} />
            <RecommendedGrid />
        </>
    )
  };
  
  export default MinifigsHome