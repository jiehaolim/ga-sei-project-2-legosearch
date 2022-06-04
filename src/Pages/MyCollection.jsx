import NavBar from "../Components/NavBar";
import SubResult from "../Components/SubResult";

const MyCollection = () => {

  let dataObj = { dataObj: {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "set_num": "082-1",
            "name": "Legoville",
            "year": 1976,
            "theme_id": 505,
            "num_parts": 63,
            "set_img_url": null,
            "set_url": "https://rebrickable.com/sets/082-1/legoville/",
            "last_modified_dt": "2020-01-22T18:59:19.970271Z"
        }
    ]
}}

  return (
    <div>
      <NavBar />
      {/* <SubResult dataObj={dataObj} />
      <SubResult dataObj={dataObj} /> */}
    </div>
  );
};

export default MyCollection;
