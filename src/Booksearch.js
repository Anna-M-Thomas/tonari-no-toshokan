import React, { useState, useEffect } from "react";
import Books from "./components/Books";

function Booksearch({ selected }) {
  const [isbn, setISBN] = useState(0);
  //search and setSearch need to be changed to an empty array
  const [search, setSearch] = useState({ systemid: null, isbn: null });

  function handleChange(event) {
    let isbnString = event.target.value.replace(/\D/g, "");
    console.log("isbnString", isbnString);
    setISBN(isbnString);
  }

  function handleSubmit(event) {
    event.preventDefault();
    //for each library in selected, make an object with different systemid, same isbn and put into array
    //Then put that in setSearch
    setSearch({ systemid: selected[0], isbn: isbn });
    setISBN(0);
  }

  const selectedList = selected.map((item, index) => (
    <h2 key={index}>{item.replace("_", "")}</h2>
  ));

  return (
    <div className="Book">
      These are your selected libraries:{" "}
      {<h2>{selected.map((item) => item.replace("_", " ")).join(", ")}</h2>}
      Let's search for a book! Enter an ISBN.
      {isbn ? <div>Your isbn is: {isbn}</div> : ""}
      <form onSubmit={handleSubmit}>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            placeholder="ISBN #"
            onChange={handleChange}
          />
        </label>
        <button>Search</button>
      </form>
      <Books search={search} />
    </div>
  );
}

export default Booksearch;
