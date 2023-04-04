import { useState, useEffect } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import SearchGrpBasic from "../../components/SearchResults/SearchGrpBasic";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import SortGrp from "../../components/SearchResults/SortGrp";
import Results from "../../components/SearchResults/Results";
import NoResults from "../../components/SearchResults/NoResults";
import Pagination from "../../components/SearchResults/Pagination";
const API_KEY = import.meta.env.VITE_API_KEY;

const HomeSearchResults = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [themes, setThemes] = useState({ "theme": [{ "id":"", "name":"Theme" }] })
  // object to store the current search params
  const currentSearchParams = {
    term: searchParams.get("term") ? searchParams.get("term") : "",
    theme: searchParams.get("theme") ? searchParams.get("theme") : "",
    minParts: searchParams.get("minParts") ? searchParams.get("minParts") : "",
    maxParts: searchParams.get("maxParts") ? searchParams.get("maxParts") : "",
    minYear: searchParams.get("minYear") ? searchParams.get("minYear") : "",
    maxYear: searchParams.get("maxYear") ? searchParams.get("maxYear") : "",
    sortBy: searchParams.get("sortBy") ? searchParams.get("sortBy") : "set_num",
    sortOrder: searchParams.get("sortOrder") ? searchParams.get("sortOrder") : "",
    pageSize: searchParams.get("pageSize") ? searchParams.get("pageSize") : 20,
    pageNo: searchParams.get("pageNo") ? searchParams.get("pageNo") : 1,
  };
  const [advSearch, setAdvSearch] = useState(false);
  // current year
  const date = new Date();
  const maxYear = date.getFullYear();
  const [searchObj, setSearchObj] = useState({
    term: searchParams.get("term") ? searchParams.get("term") : "",
    theme: searchParams.get("theme") ? searchParams.get("theme") : "",
    minParts: searchParams.get("minParts") ? searchParams.get("minParts") : 0,
    maxParts: searchParams.get("maxParts") ? searchParams.get("maxParts") : 15000, // largest lego set so far is 11695 parts
    minYear: searchParams.get("minYear") ? searchParams.get("minYear") : 1949, // year lego started
    maxYear: searchParams.get("maxYear") ? searchParams.get("maxYear") : maxYear, // current year
    sortBy: searchParams.get("sortBy") ? searchParams.get("sortBy") : "set_num", // name, set_num, year, num_parts
    sortOrder: searchParams.get("sortOrder") ? searchParams.get("sortOrder") : "", // asc is "", dsc is -
    pageSize: searchParams.get("pageSize") ? searchParams.get("pageSize") : 20,
    pageNo: searchParams.get("pageNo") ? searchParams.get("pageNo") : 1,
  });
  const [resultsObj, setResultsObj] = useState({
    count: null,
    next: "",
    previous: null,
    results: [{
        set_num: null,
        name: null,
        year: null,
        theme_id: null,
        num_parts: null,
        set_img_url: null,
        set_url: null,
        last_modified_dt: null,
        theme: null, // data added when fetching
      }],
  });

  useEffect(() => {
    // turn on or off advanced search group and update their values based on search params
    if (currentSearchParams.minParts === "") {
      const currentSearchObj = {
        term : currentSearchParams.term,
        theme : currentSearchParams.theme,
        minParts : 0, // back to default for minParts, maxParts minYears and maxYears
        maxParts : 15000,
        minYear : 1949,
        maxYear : maxYear,
        sortBy : currentSearchParams.sortBy,
        sortOrder : currentSearchParams.sortOrder,
        pageNo : currentSearchParams.pageNo,
        pageSize : currentSearchParams.pageSize,
      }
      setSearchObj({...searchObj, ...currentSearchObj})
      setAdvSearch(false)
    } else {
      const currentSearchObj = {
        term : currentSearchParams.term,
        theme : currentSearchParams.theme,
        minParts : currentSearchParams.minParts,
        maxParts : currentSearchParams.maxParts,
        minYear : currentSearchParams.minYear,
        maxYear : currentSearchParams.maxYear,
        sortBy : currentSearchParams.sortBy,
        sortOrder : currentSearchParams.sortOrder,
        pageNo : currentSearchParams.pageNo,
        pageSize : currentSearchParams.pageSize,
      }
      setSearchObj({...searchObj, ...currentSearchObj})
      setAdvSearch(true)
    }
    
    const fetchData = async () => {
    // fetch theme data
    // max data pull is 1000 but lego only have < 500 themes as now 3-April-23
    const pageSize = 1000;
    const response = await fetch(
      `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
    )
    const data = await response.json();
    // to show parent theme name with sub theme name
    const mainThemes = []
    for (const theme of data.results) {
      // no parent theme just push into array
      if (theme.parent_id === null) {
        mainThemes.push({id: theme.id, name:theme.name})
      } else {
        // with parent theme, find parent theme name and put together wiith subtheme name
        const parentTheme = data.results.find((element) => element.id === theme.parent_id)
        mainThemes.push({id: theme.id, name: `${parentTheme.name} > ${theme.name}`})
      }
    }
    mainThemes.sort((a ,b) => (a.name > b.name) ? 1 : -1)
    setThemes({theme: [...themes.theme, ...mainThemes]})

    // fetch set data
    const responseSets = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${currentSearchParams.term}&theme_id=${currentSearchParams.theme}&min_year=${currentSearchParams.minYear}&max_year=${currentSearchParams.maxYear}&min_parts=${currentSearchParams.minParts}&max_parts=${currentSearchParams.maxParts}&ordering=
        ${currentSearchParams.sortOrder}${currentSearchParams.sortBy}&page_size=${currentSearchParams.pageSize}&page=${currentSearchParams.pageNo}`
      );
      const dataSets = await responseSets.json();

      // add theme to data set
      for (const sets of dataSets.results) {
        const themeForSets = mainThemes.find((element) => element.id === sets.theme_id);
        sets.theme = themeForSets?.name;
      }
      setResultsObj(dataSets);
    };
    fetchData();
  }, [searchParams.toString()]);

  const handleSearchType = (boolean) => {
    setAdvSearch(boolean);
  };

  const handleChange = (key, value1, value2) => {
    if (key === "rangeParts") {
      setSearchObj({ ...searchObj, ["minParts"]: value1, ["maxParts"]: value2 });
    } else if (key === "rangeYears") {
      setSearchObj({ ...searchObj, ["minYear"]: value1, ["maxYear"]: value2 });
    } else if (key === "term" || key === "theme") {
      setSearchObj({ ...searchObj, [key]: value1 });
    } else {
      setSearchObj({ ...searchObj, [key]: value1 });
      const currentSearchObj = {}
      for (const [key, value] of searchParams.entries()){
        currentSearchObj[key] = value
      }
      currentSearchObj[key] = value1
      navigate({ pathname: "/search", search: "?" + createSearchParams(currentSearchObj) });
    }
  };
  
  return (
    <>
      {advSearch ? (<SearchGrpAdv themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} handleChange={handleChange} />
      ) : (<SearchGrpBasic themes={themes} handleSearchType={handleSearchType} searchObj={searchObj} handleChange={handleChange} />)}
      <SortGrp searchObj={searchObj} handleChange={handleChange} /> 
      {resultsObj.count ? <Results resultsObj={resultsObj} /> : resultsObj.count === 0 ? <NoResults /> : null }
      {resultsObj.count ? <Pagination /> : null }
    </>
  );
};

export default HomeSearchResults;
