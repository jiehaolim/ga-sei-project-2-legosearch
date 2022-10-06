import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RangeParts = ({ searchObj, handleChange }) => {
  const sliderRef = useRef(null);
  const location = useLocation()
  
  let minParts = ""
  let maxParts = ""
  // switch the number of minParts per location route
  // update the URL per location
  if (location.pathname.startsWith("/sets")) {
    minParts = "0"
    // largest lego set so far is 11695 parts
    maxParts = "15000"
  } else if (location.pathname.startsWith("/minifigures")) {
    minParts = "0"
    // largest lego set so far is 148 parts
    maxParts = "250"
  }

  useEffect(() => {
    const slider = sliderRef.current;

    const onChange = (event) => {
      handleChange("rangeParts", event.target.value1, event.target.value2)
    };
    slider?.addEventListener("change", onChange);
    return () => {slider?.removeEventListener("change", onChange)};
  }, [searchObj]);

  return (
    <>
      <br />
      <br />
      <br />
      <p>Number of Parts from <span className="partsvalue-1"></span> : <span className="partsvalue-2"></span></p>
      <tc-range-slider min={minParts} max={maxParts}
      value1={searchObj.minParts} value2={searchObj.maxParts}
      ref={sliderRef} round="0" step="100" range-dragging="true"
      generate-labels="true" value1-label=".partsvalue-1" value2-label=".partsvalue-2"></tc-range-slider>
      <br />
      <br />
      <br />
    </>
  );
};

export default RangeParts;
