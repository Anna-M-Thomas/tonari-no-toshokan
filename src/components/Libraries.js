import React, { useState } from "react";
import Branchdetails from "./Branchdetails";

const Library = ({ index, category, addSelectedLibrary, libraries }) => {
  const [open, setOpen] = useState(false);

  //Toggles details for that library system open or closed
  const toggleDetails = (event) => {
    const details = document.getElementById(`${category}`);
    details.classList.toggle("hidden");
    setOpen(!open);
  };
  return (
    <li key={index}>
      <div className="libraryName">
        <div onClick={toggleDetails}>
          {open ? (
            <i className="fas fa-angle-double-down"></i>
          ) : (
            <i className="fas fa-angle-double-up"></i>
          )}{" "}
          {category.replace("_", " ")}
        </div>
        <button data-systemid={category} onClick={addSelectedLibrary}>
          Select
        </button>
      </div>
      <ul className="details hidden" id={category}>
        Branches:
        <Branchdetails libraries={libraries} category={category} />
      </ul>
    </li>
  );
};

//System id is shared by libraries in the same system (town, university, other)
//This makes categories for all system ids in the selected prefecture
//Each category gets its own Library component (see above)
const Libraries = ({ libraries, addSelectedLibrary }) => {
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
};

export default Libraries;
