import React, { useState, useEffect } from "react";
import Libraryresults from "./components/Libraryresults";
import prefectures from "./components/prefectures";
import axios from "axios";

function Librarysearch({ favorites, setFavorites }) {
  const [libraries, setLibraries] = useState([]);
  const [search, setSearch] = useState({
    name_jp: "",
    name_en: "",
  });

  // for getting out of local storage
  // const saveditems = JSON.parse(localStorage.getItem('items'));
  // const [items, setItems] = useState(saveditems || []);

  function handleChange(event) {
    const returnedArray = prefectures.filter(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    const selectedObject = returnedArray[0];
    setSearch(selectedObject);
  }

  useEffect(() => {
    if (search.name_jp) {
      axios
        .get(
          `https://api.calil.jp/library?appkey=${process.env.REACT_APP_API_KEY}&pref=${search.name_jp}&format=json&callback=`,
          { mode: "cors" }
        )
        .then((response) => {
          setLibraries(response.data);
        });
    }
  }, [search]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(event) {
    const newFavorite = event.target.dataset.systemid;
    setFavorites(favorites.concat(newFavorite));
  }

  function handleClearButtonClick() {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  const options = prefectures.map((prefecture, index) => (
    <option value={prefecture.name_jp} key={index}>
      {prefecture.name_en}
    </option>
  ));

  return (
    <div className="library">
      <h1>Searching for {search.name_en}</h1>
      <h2>Saved libraries: {favorites.join(", ")}</h2>
      <button onClick={handleClearButtonClick}>Clear favorites</button>
      <form>
        <select value={search.name_jp} onChange={handleChange}>
          {options}
        </select>
      </form>
      <Libraryresults
        handleFavoriteButtonClick={addFavorite}
        data={libraries}
      />
    </div>
  );
}

export default Librarysearch;
