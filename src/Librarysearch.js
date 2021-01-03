import React, { useState, useEffect } from "react";
import Libraries from "./components/Libraries";
import prefectures from "./assets/prefectures";
import axios from "axios";

function Librarysearch({ selected, setSelected }) {
  const [libraries, setLibraries] = useState([]);
  const [search, setSearch] = useState({ name_jp: "", name_en: "..." });

  // for getting out of local storage
  // const saveditems = JSON.parse(localStorage.getItem('items'));
  // const [items, setItems] = useState(saveditems || []);

  function handleChange(event) {
    const selectedPrefecture = prefectures.find(
      (prefecture) => prefecture.name_jp === event.target.value
    );
    setSearch(selectedPrefecture);
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
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  function addSelected(event) {
    const newSelected = event.target.dataset.systemid;
    console.log(newSelected);
    setSelected(selected.concat(newSelected));
  }

  function handleClearButtonClick() {
    setSelected([]);
    localStorage.setItem("selected", JSON.stringify([]));
  }

  const options = prefectures.map((prefecture, index) => (
    <option value={prefecture.name_jp} key={index}>
      {prefecture.name_en}
    </option>
  ));

  return (
    <div className="library">
      <h1>Searching for: {search.name_en}</h1>
      <h2>
        Selected library groups:{" "}
        {selected.map((item) => item.replace("_", " ")).join(", ")}
      </h2>
      <button onClick={handleClearButtonClick}>Clear libraries</button>
      <form>
        <select value={search.name_jp} onChange={handleChange}>
          {options}
        </select>
      </form>
      <Libraries addSelected={addSelected} data={libraries} />
    </div>
  );
}

export default Librarysearch;
