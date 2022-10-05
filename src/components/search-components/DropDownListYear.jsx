import { useState } from "react"

const DropDownListYear = ({ handleChange }) => {
  const [year, setYear] = useState("Year")
  
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
    <select name="years" onChange={() => handleChange("year", event.target.value, "")}>
      <option value="" key="year">{year}</option>
      {arrayYear.map((year, index) => <option value={year} key={index}>{year}</option>)} 
    </select>
  );
};

export default DropDownListYear
