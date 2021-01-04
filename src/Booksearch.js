import React, { useState, useEffect } from "react";
import Books from "./components/Books";
import Isbngetter from "./components/Isbngetter";

function Booksearch({ selected }) {
  const [isbn, setISBN] = useState("");
  const [isbnTerm, setIsbnTerm] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  //search and setSearch need to be changed to an empty array
  const [search, setSearch] = useState({ systemid: null, isbn: null });

  function handleChangeIsbn(event) {
    let isbnString = event.target.value;
    console.log("isbnString", isbnString);
    setISBN(isbnString);
  }

  function handleChangeQuery(event) {
    setIsbnTerm(event.target.value);
  }

  function handleIsbnQuery(event) {
    if (isbnTerm) {
      setIsbnSearch(isbnTerm);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isbn) {
      //for each library in selected, make an object with different systemid, same isbn and put into array
      //Then put that in setSearch
      setSearch({ systemid: selected[0], isbn: isbn });
      setISBN(0);
    }
  }

  const selectedList = selected.map((item, index) => (
    <h2 key={index}>{item.replace("_", "")}</h2>
  ));

  return (
    <div className="Book">
      These are your selected libraries:{" "}
      {<h2>{selected.map((item) => item.replace("_", " ")).join(", ")}</h2>}
      Let's search for a book! Enter an ISBN, or search for an ISBN
      <Isbngetter isbnSearch={isbnSearch} />
      {<div>Your isbn is: {isbn ? isbn : "..."}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Set ISBN:
          <input
            type="text"
            name="isbn"
            placeholder="ISBN #"
            pattern="[0-9Xx\-]+"
            onChange={handleChangeIsbn}
          />
        </label>
        <br />
        <label>
          Search for ISBN:
          <input
            type="text"
            name="isbnSearch"
            placeholder="Search..."
            onChange={handleChangeQuery}
          />
        </label>
        <button onClick={handleIsbnQuery}>Search (Google books)</button>
        <br />

        <button type="submit">Search for book</button>
      </form>
      <Books search={search} />
    </div>
  );
}

export default Booksearch;
