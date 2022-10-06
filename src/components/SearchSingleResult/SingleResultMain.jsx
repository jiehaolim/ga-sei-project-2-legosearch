import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
const API_KEY = import.meta.env.VITE_API_KEY

const SingleResultMain = ({ resultObj }) => {
  const location = useLocation();
  const [theme, setTheme] = useState()

  // create variables for the text
  const productName = resultObj?.name;
  const productNum = resultObj?.set_num;
  let productTitle = "";
  let productYear = "";
  const productPieces = resultObj?.num_parts;
  const productURL = resultObj?.set_img_url;
  const productRebrickableURL = resultObj?.set_url;

  // update the text according to the page
  if (location.pathname.startsWith("/sets")) {
    productTitle = productNum + " " + productName;
    productYear = resultObj?.year;
  } else if (location.pathname.startsWith("/minifigures")) {
    productTitle = productName;
    productYear = productNum;
  }

  // fetch themes to return the theme
  useEffect(() => {
    const fetchData = async () => {
    // max data pull is 1000 but lego only have < 500 themes as now 30-Sep-22
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
        mainThemes.push({id: theme.id, name: `${parentTheme.name} - ${theme.name}`})
      }
    }
    const productThemeObj = mainThemes.find((element) => element.id === resultObj.theme_id)
    const productTheme = productThemeObj === undefined ? "" : productThemeObj.name
    setTheme(productTheme)
    }
    fetchData()
  }, [resultObj.theme_id])

  return (
    <>
      <br />
      <br />
      <div>{productTitle}</div>
      <div>{productYear}</div>
      {location.pathname.startsWith("/sets") ? <div>{theme}</div> : null}
      <div>{productPieces}</div>
      <div>{productURL}</div>
      <div>{productRebrickableURL}</div>
    </>
  );
};

export default SingleResultMain;

// sets - set_num, name, num parts, set_img_url, set_url, year, theme_id (last 2 uncommon)
// minifigs - set_num, name, num_parts, set_img_url, set_url
