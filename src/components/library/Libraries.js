import React from "react";
import Library from "./Library";

//This makes sub-categories out of each prefecture + city name
//for each category, render a Library component
function Libraries({ libraries, addSelectedLibrary }) {
  function getList() {
    let categories = [];

    for (let i = 1; i < libraries.length; i++) {
      const city = libraries[i].systemid;
      if (categories.indexOf(city) === -1) categories.push(city);
    }

    return categories.map((category, index) => (
      <Library
        key={index}
        index={index}
        category={category}
        addSelectedLibrary={addSelectedLibrary}
        libraries={libraries}
      />
    ));
  }

  return libraries.length ? <ul>{getList()}</ul> : <ul></ul>;
}

export default Libraries;
