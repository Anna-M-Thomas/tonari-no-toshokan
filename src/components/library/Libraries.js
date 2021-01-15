import React from "react";
import Library from "./Library";

//This makes sub-categories out of each prefecture + city name
//for each category, render a Library component
function Libraries({ data, addSelected }) {
  function getList() {
    let categories = [];

    for (let i = 1; i < data.length; i++) {
      const city = data[i].systemid;
      if (categories.indexOf(city) === -1) categories.push(city);
    }

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
