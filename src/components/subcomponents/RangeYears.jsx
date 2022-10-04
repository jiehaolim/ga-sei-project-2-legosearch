import { useEffect, useRef } from "react";

const RangeYears = ({ handleChange }) => {
  const sliderRef = useRef(null);
  
  // year lego releases their first set
  const minYear = "1949"
  const date = new Date()
  const maxYear = date.getFullYear()

  useEffect(() => {
    const slider = sliderRef.current;

    const onChange = (event) => {
      handleChange("rangeYears", event.target.value1, event.target.value2)
    };
    slider?.addEventListener("change", onChange);
    return () => {slider?.removeEventListener("change", onChange)};
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <p>Year of Release from <span className="value-1"></span> : <span className="value-2"></span></p>
      <tc-range-slider min={minYear} max={maxYear}
      value1={minYear} value2={maxYear}
      ref={sliderRef} round="0"
      generate-labels="true" value1-label=".value-1" value2-label=".value-2"></tc-range-slider>
      <br />
      <br />
      <br />
    </>
  );
};

export default RangeYears;
