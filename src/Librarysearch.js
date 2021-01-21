import React, { useState, useEffect } from "react";
import Libraries from "./components/Libraries";
import prefectures from "./assets/prefectures";
import Request from "axios-request-handler";
import axios from "axios";

function Librarysearch({ selectedLibraries, setSelectedLibraries }) {
  const [libraries, setLibraries] = useState([]);
  const [prefecture, setPrefecture] = useState({ name_jp: "", name_en: "..." });
  const baseURL = "https://hidden-plains-37239.herokuapp.com/library";

  //Handles change to prefecture select bar
  function handleChange(event) {
    const selectedPrefecture = prefectures.find(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    setPrefecture(selectedPrefecture);
  }

  useEffect(() => {
    if (prefecture.name_jp) {
      const requestInstance = new Request(baseURL, {
        params: {
          pref: `${prefecture.name_jp}`,
          format: `json`,
          callback: ``,
          mode: "cors",
        },
      });

      requestInstance.get().then((response) => {
        setLibraries(response.data);
      });
    }
  }, [prefecture]);

  function addSelectedLibrary(event) {
    const newSelected = event.target.dataset.systemid;
    //if library is already selected it won't be added again
    const libraryObject = libraries.find(
      (library) => library.systemid === newSelected
    );
    console.log(libraryObject);
    const inArray = selectedLibraries.some(
      (library) => library.systemid === newSelected
    );
    if (!inArray) {
      setSelectedLibraries(selectedLibraries.concat(libraryObject));
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="bold">Find a library</div>
        <form>
          <select
            className="select-css"
            value={prefecture.name_jp}
            onChange={handleChange}
          >
            {prefectures.map((prefecture, index) => (
              <option value={prefecture.name_jp} key={index}>
                {prefecture.name_en}
              </option>
            ))}
          </select>
        </form>
      </div>

      <Libraries
        addSelectedLibrary={addSelectedLibrary}
        libraries={libraries}
      />
    </>
  );
}

export default Librarysearch;
