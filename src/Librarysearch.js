import React, { useState, useEffect } from "react";
import Libraries from "./components/library/Libraries";
import prefectures from "./assets/prefectures";
import axios from "axios";

function Librarysearch({ selected, setSelected, isbn, book }) {
  const [libraries, setLibraries] = useState([]);
  const [search, setSearch] = useState({ name_jp: "", name_en: "..." });

  console.log(
    "Does book exist?",
    Object.keys(book).length !== 0
      ? `Yes. The isbn is${book.industryIdentifiers[0].identifier} and the title is ${book.title}`
      : "No"
  );
  console.log("Selected ISBN:", isbn ? isbn : "...");

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
    const inArray = selected.some((library) => library === newSelected);
    if (!inArray) {
      setSelected(selected.concat(newSelected));
    }
  }

  const options = prefectures.map((prefecture, index) => (
    <option value={prefecture.name_jp} key={index}>
      {prefecture.name_en}
    </option>
  ));

  return (
    <div className="library">
      <div className="libraryTop">
        <h2>Find a library</h2>
        <form>
          <select
            className="select-css"
            value={search.name_jp}
            onChange={handleChange}
          >
            {options}
          </select>
        </form>
      </div>
      <Libraries addSelected={addSelected} data={libraries} />
    </div>
  );
}

export default Librarysearch;
