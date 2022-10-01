const RangeParts = () => {
  return (
    <>
      <label>
        <br />
        <span>Year of Release</span>
        <span>From minyear to maxyear</span>
        <br />
        <input type="range" id="volume" name="volume" min="0" max="11"></input>
      </label>
    </>
  );
};

export default RangeParts;
