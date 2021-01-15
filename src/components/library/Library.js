import React, { useState } from "react";
import Branchdetails from "./Branchdetails";

//Each Library component is actually a group of libraries (in that municipality, college, whatever)
const Library = ({ index, category, addSelected, data }) => {
  const [open, setOpen] = useState(false);

  const toggleDetails = (event) => {
    const details = document.getElementById(`${category}`);
    console.log(details);
    details.classList.toggle("hidden");
    setOpen(!open);
  };
  return (
    <div key={index} className="library">
      <div className="libraryName">
        <div onClick={toggleDetails}>
          {open ? (
            <i className="fas fa-angle-double-down"></i>
          ) : (
            <i className="fas fa-angle-double-up"></i>
          )}{" "}
          {category.replace("_", " ")}
        </div>
        <button data-systemid={category} onClick={addSelected}>
          Select
        </button>
      </div>
      <ul className="details hidden" id={category}>
        <Branchdetails data={data} category={category} />
      </ul>
    </div>
  );
};

export default Library;
