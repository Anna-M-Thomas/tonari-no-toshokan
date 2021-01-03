import React, { useState, useEffect } from "react";
import Books from "./components/Books";

function Booksearch({ favorites }) {
  const favoriteslist = favorites.map((item, index) => (
    <h2 key={index}>{item}</h2>
  ));

  const [isbn, setISBN] = useState(0);
  const [search, setSearch] = useState({ systemid: null, isbn: null });

  function handleChange(event) {
    let isbnString = event.target.value.replace(/\D/g, "");
    console.log("isbnString", isbnString);
    setISBN(isbnString);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearch({ systemid: favorites[0], isbn: isbn });
    setISBN(0);
  }

  return (
    <div className="Book">
      These are your favorites: {favoriteslist}
      Let's search for a book! Enter an ISBN.
      {isbn && <div>Your isbn is: {isbn}</div>}
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
