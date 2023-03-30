import { useEffect, useRef } from "react";

const RangeYears = ({}) => {
  const sliderRef = useRef(null);

  // year lego releases their first set
  const date = new Date();
  const year = {
    min: "1949",
    max: date.getFullYear(),
  };

  useEffect(() => {
    const slider = sliderRef.current;

    const onChange = (event) => {
      handleChange("rangeYears", event.target.value1, event.target.value2);
    };
    slider?.addEventListener("change", onChange);
    return () => {
      slider?.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      <p className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Year of Release from <span className="yearvalue-1"></span> :{" "}
        <span className="yearvalue-2"></span>
      </p>
      <tc-range-slider
        slider-width="100%"
        slider-height="8px"
        slider-bg-fill="rgb(79 70 229)"
        min={year.min}
        max={year.max}
        value1={year.min}
        value2={year.max}
        ref={sliderRef}
        round="0"
        range-dragging="true"
        generate-labels="false"
        value1-label=".yearvalue-1"
        value2-label=".yearvalue-2"
      ></tc-range-slider>
    </>
  );
};

export default RangeYears;
