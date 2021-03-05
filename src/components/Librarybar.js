import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLibraries } from "../reducers/libraryReducer";

const Librarybar = () => {
  const selectedLibraries = useSelector((state) => state.libraries);
  const dispatch = useDispatch();

  const libraryClearButtonClick = () => {
    dispatch(clearLibraries());
  };

  return (
    <div className="topbar">
      Selected libraries:{" "}
      {selectedLibraries.map((item) => item.replace("_", " ")).join(", ")}
      <button onClick={libraryClearButtonClick} className="alertButton">
        Clear
      </button>{" "}
    </div>
  );
};

export default Librarybar;
