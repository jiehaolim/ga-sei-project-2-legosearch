import { useState } from "react"

const YearDropDownList = () => {
  const [year, setYear] = useState("Year")
  
  // year lego started
  const minYear = "1949"
  const date = new Date()
  const maxYear = date.getFullYear()
  return (
    <select name="year" id="year">
      <option value="year" key="year">{year}</option>
    </select>
  );
};

export default YearDropDownList
