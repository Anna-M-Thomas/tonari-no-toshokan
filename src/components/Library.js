import React, { useState } from "react";
import Branchdetails from "./Branchdetails";

const Library = ({ category, addSelectedLibrary, currentLibrary }) => {
  const [open, setOpen] = useState(false);

  const toggleDetails = () => {
    setOpen(!open);
  };

  return (
    <li>
      <div className="libraryName" key={currentLibrary.id}>
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
          <Branchdetails currentLibrary={currentLibrary} />
        </ul>
      )}
    </li>
  );
};

export default Library;
