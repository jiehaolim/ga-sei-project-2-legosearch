import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import XLSX from "xlsx";
import CollectionHeader from "../../components/Collection/CollectionHeader";
import CollectionTabs from "../../components/Collection/CollectionTabs";
import CollectionEmpty from "../../components/Collection/CollectionEmpty";
import CollectionResult from "../../components/Collection/CollectionResult";

const Collection = ({ collection, handleAdd, handleRemove }) => {
  const [contentLoaded, setContentLoaded] = useOutletContext()
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "set";

  const collectionObj = {
    set: {
      title: "set",
      count: collection["set"].reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ),
    },
    setMinifig: {
      title: "minifigures",
      count: collection["setMinifig"].reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ),
    },
    build: {
      title: "loose build",
      count: collection["build"].reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ),
    },
    minifig: {
      title: "loose minifigures",
      count: collection["minifig"].reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ),
    },
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

  useEffect(()=> {
    setContentLoaded(true)
  },[])

  return (
    <>
      <CollectionHeader
        collectionObj={collectionObj}
        handleExport={handleExport}
      />
      <CollectionTabs collectionObj={collectionObj} />
      {collectionObj[currentTab].count === 0 ? (
        <CollectionEmpty collectionObj={collectionObj} />
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
