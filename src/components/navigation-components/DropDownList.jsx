const DropDownList = ({ sortObj, navObj, handleSubmit }) => {
  const dropdowntype = Object.keys(sortObj)[0]
  return (
    <>
      <select value={navObj[dropdowntype]} onChange={() => {handleSubmit(dropdowntype, event.target.value)}}>
        {sortObj[dropdowntype].map((element, index) => (
          <option value={element.value} key={index}>{element.name}</option>
        ))}
      </select>
    </>
  );
};

export default DropDownList;