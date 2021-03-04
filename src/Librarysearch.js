import React, { useRef, useState, useEffect } from "react";
import Library from "./components/Library";
import prefectures from "./assets/prefectures";
import Request from "axios-request-handler";

function Librarysearch({ selectedLibraries, setSelectedLibraries }) {
  const libraries = useRef([]);
  const [prefecture, updatePrefecture] = useState({
    name_jp: "",
    name_en: "...",
  });
  const [isLoading, updateIsLoading] = useState(false);

  // URL is https://api.calil.jp/library, using API-key-proxy-server
  // const baseURL = "https://hidden-plains-37239.herokuapp.com/library";
  const baseURL =
    "https://cors-anywhere.herokuapp.com/https://api.calil.jp/library";

  //Handles change to prefecture select bar
  function handleChange(event) {
    const selectedPrefecture = prefectures.find(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    updatePrefecture(selectedPrefecture);
  }

  const libraryClearButtonClick = () => {
    setSelectedLibraries([]);
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

      updateIsLoading(true);

      requestInstance.get().then((response) => {
        libraries.current = response.data;
        console.log("Libraries current", libraries.current);
        updateIsLoading(false);
      });
    }
  }, [prefecture]);

  function addSelectedLibrary(event) {
    const newSelected = event.target.dataset.systemid;
    //if library is already selected it won't be added again
    const inArray = selectedLibraries.some(
      (library) => library === newSelected
    );
    if (!inArray) {
      setSelectedLibraries(selectedLibraries.concat(newSelected));
    }
  }

  //returns the system ids
  const categories = libraries.current
    .map((library) => library.systemid)
    //filters out duplicate system ids
    .filter((id, index, array) => {
      return array.indexOf(id) === index;
    })
    //Pass on *just* category name and the relevant libraries
    .map((category, index) => {
      const currentLibrary = libraries.current.filter(
        (object) => object.systemid === category
      );
      return (
        <Library
          key={index}
          index={index}
          category={category}
          addSelectedLibrary={addSelectedLibrary}
          currentLibrary={currentLibrary}
        />
      );
    });

  return (
    <>
      {selectedLibraries.length > 0 && (
        <div className="topbar">
          Selected libraries:{" "}
          {selectedLibraries.map((item) => item.replace("_", " ")).join(", ")}
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
      {isLoading ? "" : <ul>{categories}</ul>}
    </>
  );
}

export default Librarysearch;
