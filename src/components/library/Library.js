import React, { useState } from "react";
import Branchdetails from "./Branchdetails";

//Each Library component is actually a group of libraries (in that municipality, college, whatever)
const Library = ({ index, category, addSelectedLibrary, libraries }) => {
  const [open, setOpen] = useState(false);

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

export default Library;
