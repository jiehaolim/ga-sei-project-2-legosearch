import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RangeParts = ({}) => {
  const sliderRef = useRef(null);
  const location = useLocation();

  // object for parts
  const parts = {
    min: "",
    max: "",
    step: "",
  };
  // switch the number of minParts per location route
  // update the URL per location
  if (location.pathname.startsWith("/")) {
    parts.min = "0";
    // largest lego set so far is 11695 parts
    parts.max = "15000";
    // step
    parts.step = "100";
  } else if (location.pathname.startsWith("/minifigures")) {
    parts.min = "0";
    // largest lego set so far is 148 parts
    parts.max = "250";
    // step
    parts.step = "50";
  }

  useEffect(() => {
    const slider = sliderRef.current;

    const onChange = (event) => {
      handleChange("rangeParts", event.target.value1, event.target.value2);
    };

    slider?.addEventListener("change", onChange);
    return () => {
      slider?.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      <p className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Number of Parts from <span className="partsvalue-1"></span> :{" "}
        <span className="partsvalue-2"></span>
      </p>
        <tc-range-slider
          slider-width="100%"
          slider-height="8px"
          slider-bg-fill="rgb(79 70 229)"
          min={parts.min}
          max={parts.max}
          value1={parts.min}
          value2={parts.max}
          ref={sliderRef}
          round="0"
          step={parts.step}
          range-dragging="true"
          generate-labels="false"
          value1-label=".partsvalue-1"
          value2-label=".partsvalue-2"
        ></tc-range-slider>
    </>
  );
};

export default RangeParts;
