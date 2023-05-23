import CollectionHeader from "../../components/Collection/CollectionHeader";
import Tabs from "../../components/Collection/Tabs";
import SortGrp from "../../components/Collection/SortGrp";
import EmptyCollection from "../../components/Collection/EmptyCollection";
import CollectionResult from "../../components/Collection/CollectionResult";

const Collection = () => {
  return (
    <>
      <CollectionHeader />
      <Tabs />
      <SortGrp />
      {/* <EmptyCollection /> */}
      <CollectionResult />
    </>
  );
};

export default Collection;
