const DropDownList = ({ stateObj, selectObj, handleChange }) => {
  const objKey = Object.keys(selectObj)[0]
  
  return (
    <>
      <select value={stateObj[objKey]} onChange={() => {handleChange(objKey, event.target.value)}}>
        {selectObj[objKey].map((element, index) => (
          <option value={element.value} key={index}>{element.name}</option>
        ))}
      </select>
    </>
  );
};

export default DropDownList;