import { useSearchParams } from "react-router-dom";
import XLSX from "xlsx";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import CollectionTabs from "../../components/Collection/CollectionTabs";
import SortGrp from "../../components/Collection/SortGrp";
import CollectionEmpty from "../../components/Collection/CollectionEmpty";
import CollectionResult from "../../components/Collection/CollectionResult";

const Collection = ({ collection, handleAdd, handleRemove }) => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "set";

  const initialValue = 0;
  const collectionCount = {
    set: collection["set"].reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      initialValue
    ),
    setMinifig: collection["setMinifig"].reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      initialValue
    ),
    build: collection["build"].reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      initialValue
    ),
    minifig: collection["minifig"].reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      initialValue
    ),
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    Object.keys(collection).forEach((sheetName) => {
      if (collection[sheetName].length > 0) {
        const worksheetData = collection[sheetName];
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    });
    XLSX.writeFile(workbook, "lego_collection.xlsx");
  };

  return (
    <>
      <CollectionHeader handleExport={handleExport} />
      <CollectionTabs collectionCount={collectionCount} />
      {/* <SortGrp /> */}
      {collectionCount[currentTab] === 0 ? (
        <CollectionEmpty />
      ) : (
        <CollectionResult
          collection={collection[currentTab]}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
      )}
    </>
  );
};

export default Collection;
