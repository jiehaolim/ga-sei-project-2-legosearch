import NavBar from "../Components/NavBar";
import Collection from "../destroy/Collection";

const MyCollection = ({collectionObj}) => {
  // compute the unique sets and unqiue minifigures in the state
  let setsData = collectionObj.sets;
  let minifigsData = collectionObj.minifigs;
  let uniqueSets = [...new Set(setsData.map((element) => element.id))];
  let uniqueMinifigs = [...new Set(minifigsData.map((element) => element.id))];
  const computedSets = [];
  const computedMinifigs = [];

  // created the computed set array
  for (const uSet of uniqueSets) {
    computedSets.push({ id: uSet, name: "", imageURL: "", qty: 0 });
  }

  // update the quantity and details
  for (const cSet of computedSets) {
    for (const set of setsData) {
      if (cSet.id === set.id) {
        cSet.name = set.name;
        cSet.imageURL = set.imageURL;
        cSet.qty += 1;
      }
    }
  }

  // created the computed minifig array
  for (const uMinifg of uniqueMinifigs) {
    computedMinifigs.push({ id: uMinifg, name: "", imageURL: "", qty: 0 });
  }

  // update the quantity and details
  for (const cMinifig of computedMinifigs) {
    for (const minifig of minifigsData) {
      if (cMinifig.id === minifig.id) {
        cMinifig.name = minifig.name;
        cMinifig.imageURL = minifig.imageURL;
        cMinifig.qty += 1;
      }
    }
  }

  // title for 2 components
  const titleSets = computedSets.length === 1 && computedSets[0].qty === 1 ? "LEGO set collected" : "LEGO sets collected"
  const titleMinifigs = computedMinifigs.length === 1 && computedMinifigs[0].qty === 1 ? "Minifigure collected" : "Minifigures collected"

  return (
    <div>
      <NavBar />
      {computedSets.length === 0 ? null : <Collection titleName={titleSets} collectionObj={computedSets} />}
      {computedMinifigs.length === 0 ? null : <Collection titleName={titleMinifigs} collectionObj={computedMinifigs} />}
    </div>
  );
};

export default MyCollection;
