import CollectionHeader from "../../components/Collection/CollectionHeader";
import CollectionTabs from "../../components/Collection/CollectionTabs";
import SortGrp from "../../components/Collection/SortGrp";
import EmptyCollection from "../../components/Collection/EmptyCollection";
import CollectionResult from "../../components/Collection/CollectionResult";

const Collection = () => {
  return (
    <>
      <CollectionHeader />
      <CollectionTabs />
      <SortGrp />
      <EmptyCollection />
      <CollectionResult />
    </>
  );
};

export default Collection;
