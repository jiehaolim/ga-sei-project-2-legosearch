import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchGrpBasic from "../../components/SearchResults/SearchGrpBasic";
import SearchGrpAdvMinifigs from "../../components/SearchResults/Minifigs/SearchGrpAdvMinifigs";
import SortGrp from "../../components/SearchResults/SortGrp";
import Results from "../../components/SearchResults/Results";
import NoResults from "../../components/SearchResults/NoResults";
import Pagination from "../../components/SearchResults/Pagination";
const API_KEY = import.meta.env.VITE_API_KEY;

const MinifigsSearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSearchParams = {
    term: searchParams.get("term") ?? "",
    theme: searchParams.get("theme") ?? "",
    minParts: searchParams.get("minParts") ?? 0,
    maxParts: searchParams.get("maxParts") ?? 250, // largest lego minfigures so far is 148 parts
    sortBy: searchParams.get("sortBy") ?? "set_num", // name, set_num, num_parts
    sortOrder: searchParams.get("sortOrder") ?? "", // asc is "", dsc is -
    pageSize: searchParams.get("pageSize") ?? 20,
    pageNo: searchParams.get("pageNo") ?? 1,
  };
  const [themes, setThemes] = useState({ theme: [{ id: "", name: "Theme" }] });
  const [advSearch, setAdvSearch] = useState(false);
  const [resultsObj, setResultsObj] = useState({
    count: null,
    next: "",
    previous: null,
    results: [
      {
        set_num: null,
        name: null,
        num_parts: null,
        set_img_url: null,
        set_url: null,
        last_modified_dt: null,
      },
    ],
  });

  const handleSearchType = (boolean) => {
    setAdvSearch(boolean);
  };

  // fetch data
  const fetchData = async () => {
    try {
      // fetch theme data
      // max data pull is 1000 but lego only have < 500 themes as now 3-April-23
      const pageSize = 1000;
      const responseThemes = await fetch(
        `https://rebrickable.com/api/v3/lego/themes/?key=${API_KEY}&page_size=${pageSize}`
      );
      const dataThemes = await responseThemes.json();

      // fetch set data
      const responseMinifigs = await fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/?key=${API_KEY}&search=${currentSearchParams.term}&in_theme_id=${currentSearchParams.theme}&min_parts=${currentSearchParams.minParts}&max_parts=${currentSearchParams.maxParts}&ordering=${currentSearchParams.sortOrder}${currentSearchParams.sortBy}&page_size=${currentSearchParams.pageSize}&page=${currentSearchParams.pageNo}`
      );
      const dataMinifigs = await responseMinifigs.json();

      // error handling
      // error scenario 1 - API throttled too fast 429 for themes
      if (!responseThemes.ok) throw responseThemes.status;

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
      // set state
      setThemes({ theme: [...themes.theme, ...mainThemes] });

      // error scenario 2 - 400 for wrong params 404 for invalid page if user change URL on URL Bar
      if (!responseMinifigs.ok) throw responseMinifigs.status;

      setResultsObj(dataMinifigs);
    } catch (error) {
      navigate(`../error/${error}`);
    }
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
    fetchData();
  }, [searchParams.toString()]);

  return (
    <>
      {advSearch ? (
        <SearchGrpAdvMinifigs
          themes={themes}
          handleSearchType={handleSearchType}
        />
      ) : (
        <SearchGrpBasic themes={themes} handleSearchType={handleSearchType} />
      )}
      <SortGrp />
      {resultsObj.count > 0 ? (
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

export default MinifigsSearchResults;
