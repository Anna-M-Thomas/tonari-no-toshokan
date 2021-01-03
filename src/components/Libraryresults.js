import React from "react";
import Librarycategory from "./Librarycategory";

function Libraryresults(props) {
  function getList() {
    //This makes sub-categories out of each prefecture + city name
    // Use .replace("_", " ") to clean up system ID for rendering
    let categories = [];

    for (let i = 1; i < props.data.length; i++) {
      const city = props.data[i].systemid;
      if (categories.indexOf(city) === -1) categories.push(city);
    }

    //for each category, render Librarycategory component
    return categories.map((category, index) => (
      <Librarycategory
        key={index}
        index={index}
        category={category}
        handleFavoriteButtonClick={props.handleFavoriteButtonClick}
        data={props.data}
      />
    ));
  }

  return props.data.length ? <div>{getList()}</div> : <div></div>;
}

export default Libraryresults;
