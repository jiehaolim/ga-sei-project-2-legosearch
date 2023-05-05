import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchGrpBasic from "../../components/SearchResults/SearchGrpBasic";
import SearchGrpAdv from "../../components/SearchResults/SearchGrpAdv";
import SortGrp from "../../components/SearchResults/SortGrp";
import Results from "../../components/SearchResults/Results";
import NoResults from "../../components/SearchResults/NoResults";
import Pagination from "../../components/SearchResults/Pagination";
const API_KEY = import.meta.env.VITE_API_KEY;

const HomeSearchResults = ({ setThemesToState, themes }) => {
  const [searchParams] = useSearchParams();
  const [advSearch, setAdvSearch] = useState(false);
  // current year
  const date = new Date();
  const maxYear = date.getFullYear();
  const currentSearchParams = {
    term: searchParams.get("term") ?? "",
    theme: searchParams.get("theme") ?? "",
    minParts: searchParams.get("minParts") ?? 0,
    maxParts: searchParams.get("maxParts") ?? 15000, // largest lego set so far is 11695 parts
    minYear: searchParams.get("minYear") ?? 1949, // year lego started
    maxYear: searchParams.get("maxYear") ?? maxYear, // current year
    sortBy: searchParams.get("sortBy") ?? "set_num", // name, set_num, year, num_parts
    sortOrder: searchParams.get("sortOrder") ?? "", // asc is "", dsc is -
    pageSize: searchParams.get("pageSize") ?? 20,
    pageNo: searchParams.get("pageNo") ?? 1,
  };
  const [resultsObj, setResultsObj] = useState({
    count: null,
    next: "",
    previous: null,
    results: [
      {
        set_num: null,
        name: null,
        year: null,
        theme_id: null,
        num_parts: null,
        set_img_url: null,
        set_url: null,
        last_modified_dt: null,
        theme: null, // data added when fetching
      },
    ],
  });

  const handleSearchType = (boolean) => {
    setAdvSearch(boolean);
  };

  useEffect(() => {
    // Load page at the top
    window.scrollTo({ top: 0, left: 0 });
    // check if what search mode is on
    if (searchParams.has("minParts")) {
      setAdvSearch(true);
    } else {
      setAdvSearch(false);
    }

    // fetch data
    const fetchData = async () => {
      // fetch theme data
      // max data pull is 1000 but lego only have < 500 themes as now 3-April-23
      const pageSize = 1000;
      const responseThemes = await fetch(
        `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
      );
      const dataThemes = await responseThemes.json();

      // fetch set data
      const responseSets = await fetch(
        `https://rebrickable.com/api/v3/lego/sets/?key=${API_KEY}&search=${currentSearchParams.term}&theme_id=${currentSearchParams.theme}&min_year=${currentSearchParams.minYear}&max_year=${currentSearchParams.maxYear}&min_parts=${currentSearchParams.minParts}&max_parts=${currentSearchParams.maxParts}&ordering=
          ${currentSearchParams.sortOrder}${currentSearchParams.sortBy}&page_size=${currentSearchParams.pageSize}&page=${currentSearchParams.pageNo}`
      );
      const dataSets = await responseSets.json();

      // to show parent theme name with sub theme name
      const mainThemes = [];
      for (const theme of dataThemes.results) {
        // no parent theme just push into array
        if (theme.parent_id === null) {
          mainThemes.push({ id: theme.id, name: theme.name });
        } else {
          // with parent theme, find parent theme name and put together wiith subtheme name
          const parentTheme = dataThemes.results.find(
            (element) => element.id === theme.parent_id
          );
          mainThemes.push({
            id: theme.id,
            name: `${parentTheme.name} > ${theme.name}`,
          });
        }
      }
      // sort themes in alphabetically order
      mainThemes.sort((a, b) => (a.name > b.name ? 1 : -1));
      // set state in app.jsx
      setThemesToState(mainThemes);

      // add theme to data set
      for (const sets of dataSets.results) {
        const themeForSets = mainThemes.find(
          (element) => element.id === sets.theme_id
        );
        sets.theme = themeForSets?.name;
      }
      setResultsObj(dataSets);
    };
    fetchData();
  }, [searchParams.toString()]);

  return (
    <>
      {advSearch ? (
        <SearchGrpAdv themes={themes} handleSearchType={handleSearchType} />
      ) : (
        <SearchGrpBasic themes={themes} handleSearchType={handleSearchType} />
      )}
      <SortGrp />
      {resultsObj.count ? (
        <>
          <Results resultsObj={resultsObj} />
          <Pagination resultsObj={resultsObj} />
        </>
      ) : resultsObj.count === 0 ? (
        <NoResults />
      ) : null}
    </>
  );
};

export default HomeSearchResults;
