import recommendedMinifigThemes from "../../data/recommendedMinifigThemes";
import Search from "../../components/Shared/Search";
import RecommendedGrid from "../../components/Shared/RecommendedGrid";

const searchTitle = "minifigures"

const MinifigsHome = () => {
    
    return (
        <>
            <Search searchTitle={searchTitle} />
            <RecommendedGrid recommendedThemes={recommendedMinifigThemes}/>
        </>
    )
  };
  
  export default MinifigsHome