import React, { useState } from "react";
import Branchdetails from "./Branchdetails";

const Library = ({ index, category, addSelectedLibrary, libraries }) => {
  const [open, setOpen] = useState(false);

  const toggleDetails = (event) => {
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
      {open && (
        <ul className="details">
          Branches:
          <Branchdetails libraries={libraries} category={category} />
        </ul>
      )}
    </li>
  );
};

export default Library;
