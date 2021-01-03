import React from "react";
import Librarydetails from "./Librarydetails";

const Library = ({ index, category, addSelected, data }) => {
  return (
    <details key={index}>
      <summary>
        {category.replace("_", " ")}
        <button data-systemid={category} onClick={addSelected}>
          Select library
        </button>
      </summary>
      <ul>
        <Librarydetails data={data} category={category} />
      </ul>
    </details>
  );
};

export default Library;
