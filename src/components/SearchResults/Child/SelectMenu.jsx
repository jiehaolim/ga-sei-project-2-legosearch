const SelectMenu = ({ selectObj, stateObj, handleChange }) => {
  const objKey = Object.keys(selectObj)[0];

  return (
    <>
      <div>
        <select
          id={objKey}
          name={objKey}
          value={stateObj[objKey]}
          onChange={(event) => handleChange(objKey, event)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 truncate"
        >
          {selectObj[objKey].map((element, index) => (
            <option key={index} value={element.id}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectMenu;
