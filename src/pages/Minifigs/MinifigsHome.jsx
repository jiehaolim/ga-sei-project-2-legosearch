import Search from "../../components/Search";
import Recommended from "../../components/recommended";

const searchTitle = "minifigures"

const MinifigsHome = () => {
    
    return (
        <>
            <Search searchTitle={searchTitle} />
            <Recommended />
        </>
    )
  };
  
  export default MinifigsHome