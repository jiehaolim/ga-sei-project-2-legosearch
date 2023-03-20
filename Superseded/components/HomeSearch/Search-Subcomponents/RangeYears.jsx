import { useEffect, useRef } from "react";

const RangeYears = ({ searchObj, handleChange }) => {
  const sliderRef = useRef(null);
  
  // year lego releases their first set
  const date = new Date()
  const year = {
    min: "1949",
    max: date.getFullYear()
  }

  useEffect(() => {
    const slider = sliderRef.current;

    const onChange = (event) => {
      handleChange("rangeYears", event.target.value1, event.target.value2)
    };
    slider?.addEventListener("change", onChange);
    return () => {slider?.removeEventListener("change", onChange)};
    
  }, [searchObj]);

  return (
    <>
      <br />
      <br />
      <br />
      <p>Year of Release from <span className="yearvalue-1"></span> : <span className="yearvalue-2"></span></p>
      <tc-range-slider min={year.min} max={year.max}
      value1={searchObj.minYear} value2={searchObj.maxYear}
      ref={sliderRef} round="0" range-dragging="true"
      generate-labels="true" value1-label=".yearvalue-1" value2-label=".yearvalue-2"></tc-range-slider>
      <br />
      <br />
      <br />
    </>
  );
};

export default RangeYears;
