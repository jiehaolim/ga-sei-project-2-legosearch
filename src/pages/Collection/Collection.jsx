import CollectionHeader from "../../components/Collection/CollectionHeader"
import Tabs from "../../components/Collection/Tabs"
import EmptyCollection from "../../components/Collection/EmptyCollection";
import CollectionResult from "../../components/Collection/CollectionResult";

const Collection = () => {
  return (
    <>
      <CollectionHeader />
      <Tabs />  
      {/* <EmptyCollection /> */}
      <CollectionResult />
    </>
  );
};

export default Collection;