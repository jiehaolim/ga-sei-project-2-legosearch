const DropDownListYear = ({ handleChange }) => {
  // year lego releases their first set
  const minYear = "1949"
  const date = new Date()
  const maxYear = date.getFullYear()
  
  // generate an array of year for the drop down list
  const arrayYear = []
  for (let i = maxYear; i >= minYear; i--) {
    arrayYear.push(i)
  }
  
  return (
    <select name="year" onChange={() => handleChange("year", event.target.value, "")}>
      <option value="" key="year">Year</option>
      {arrayYear.map((year, index) => <option value={year} key={index}>{year}</option>)} 
    </select>
  );
};

export default DropDownListYear
