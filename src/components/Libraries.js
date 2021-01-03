import React from "react";
import Library from "./Library";

function Libraries({ data, addSelected }) {
  function getList() {
    //This makes sub-categories out of each prefecture + city name
    // Use .replace("_", " ") to clean up system ID for rendering
    let categories = [];

    for (let i = 1; i < data.length; i++) {
      const city = data[i].systemid;
      if (categories.indexOf(city) === -1) categories.push(city);
    }

    //for each category, render Library component
    return categories.map((category, index) => (
      <Library
        key={index}
        index={index}
        category={category}
        addSelected={addSelected}
        data={data}
      />
    ));
  }

  return data.length ? <div>{getList()}</div> : <div></div>;
}

export default Libraries;
