import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLibrary } from "./reducers/libraryReducer";
import Library from "./components/Library";
import prefectures from "./assets/prefectures";
import libraryService from "./services/libraries";

function Chooselibrary() {
  const [libraries, setLibraries] = useState([]);
  const [prefecture, updatePrefecture] = useState({
    name_jp: "",
    name_en: "...",
  });
  const [isLoading, updateIsLoading] = useState(false);

  const selectedLibraries = useSelector((state) => state.libraries);
  const dispatch = useDispatch();

  //Handles change to prefecture select bar
  function handleChange(event) {
    const selectedPrefecture = prefectures.find(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    updatePrefecture(selectedPrefecture);
  }

  useEffect(() => {
    if (prefecture.name_jp) {
      updateIsLoading(true);
      libraryService.getLibraries(prefecture.name_jp).then((result) => {
        setLibraries(result);
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
      dispatch(addLibrary(newSelected));
      //setSelectedLibraries(selectedLibraries.concat(newSelected));
    }
  }

  //returns the system ids
  const categories = libraries
    .map((library) => library.systemid)
    //filters out duplicate system ids
    .filter((id, index, array) => {
      return array.indexOf(id) === index;
    });

  //Pass on *just* category name and the relevant libraries
  const libraryComponents = categories.map((category) => {
    const currentLibrary = libraries.filter(
      (object) => object.systemid === category
    );
    return (
      <Library
        key={currentLibrary[0].libid}
        category={category}
        addSelectedLibrary={addSelectedLibrary}
        currentLibrary={currentLibrary}
      />
    );
  });

  return (
    <div className="container">
      <div className="topbar">
        <div className="bold">Find a library</div>
        <form>
          <select
            className="select-css"
            value={prefecture.name_jp}
            onChange={handleChange}
          >
            {prefectures.map((prefecture) => (
              <option value={prefecture.name_jp} key={prefecture.name_jp}>
                {prefecture.name_en}
              </option>
            ))}
          </select>
        </form>
      </div>
      {isLoading ? "" : <ul>{libraryComponents}</ul>}
    </div>
  );
}

export default Chooselibrary;
