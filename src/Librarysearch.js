import React, { useState, useEffect } from "react";
import Library from "./components/Library";
import prefectures from "./assets/prefectures";
import Request from "axios-request-handler";

function Librarysearch({ selectedLibraries, setSelectedLibraries }) {
  const [libraries, setLibraries] = useState([]);
  const [prefecture, setPrefecture] = useState({ name_jp: "", name_en: "..." });
  // URL is https://api.calil.jp/library, using API-key-proxy-server
  const baseURL = "https://hidden-plains-37239.herokuapp.com/library";

  //Handles change to prefecture select bar
  function handleChange(event) {
    const selectedPrefecture = prefectures.find(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    setPrefecture(selectedPrefecture);
  }

  const libraryClearButtonClick = () => {
    setSelectedLibraries([]);
    localStorage.setItem("library", JSON.stringify([]));
  };

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
    const inArray = selectedLibraries.some(
      (library) => library.systemid === newSelected
    );
    if (!inArray) {
      setSelectedLibraries(selectedLibraries.concat(libraryObject));
    }
  }

  const categories = libraries
    .map((library) => library.systemid)
    .filter((id, index, array) => {
      return array.indexOf(id) === index;
    })
    .map((category, index) => (
      <Library
        key={index}
        index={index}
        category={category}
        addSelectedLibrary={addSelectedLibrary}
        libraries={libraries}
      />
    ));

  return (
    <>
      {selectedLibraries.length > 0 && (
        <div className="topbar">
          Selected libraries:{" "}
          {selectedLibraries
            .map((item) => item.systemid.replace("_", " "))
            .join(", ")}
          <button onClick={libraryClearButtonClick} className="alertButton">
            Clear
          </button>{" "}
        </div>
      )}
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
      {libraries.length ? <ul>{categories}</ul> : ""}
    </>
  );
}

export default Librarysearch;
