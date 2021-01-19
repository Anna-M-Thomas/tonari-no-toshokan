import React, { useState } from "react";
import Librarybooks from "./components/Librarybooks";
import Googlebooks from "./components/Googlebooks";

function Booksearch({ selectedLibraries, book, setBook }) {
  const [googleBooksQuery, setGoogleBooksQuery] = useState("");
  const [googleBooksOpen, setGoogleBooksOpen] = useState(false);
  const [libraryBookSearch, setLibraryBookSearch] = useState([]);
  const [libraryBooksOpen, setLibraryBooksOpen] = useState(false);

  function handleChangeQuery(event) {
    setGoogleBooksOpen(false);
    setGoogleBooksQuery(event.target.value);
  }

  function handleGoogleBooksSearch(event) {
    event.preventDefault();
    if (googleBooksQuery) {
      setGoogleBooksOpen(true);
      setLibraryBooksOpen(false);
    }
  }

  function handleLibraryBookSearch(event) {
    event.preventDefault();
    if (Object.keys(book).length > 0 && selectedLibraries) {
      let newArray = selectedLibraries.map((library) => {
        return {
          systemid: library.systemid,
          isbn: book.industryIdentifiers[0].identifier,
        };
      });
      setLibraryBookSearch(newArray);
      setLibraryBooksOpen(true);
    }
  }

  let searchResults = libraryBookSearch.map((library) => (
    <Librarybooks search={library} key={library.systemid} />
  ));

  return (
    <>
      <div className="topbar">
        <form onSubmit={handleGoogleBooksSearch}>
          <label className="bold">
            Select a new book{" "}
            <input
              type="text"
              name="googleBook"
              placeholder="Search..."
              onChange={handleChangeQuery}
            />
          </label>
          <button type="submit">Enter</button>
        </form>
      </div>
      {!googleBooksOpen && (
        <form onSubmit={handleLibraryBookSearch} className="topbar">
          <button type="submit">Search libraries for your book</button>
        </form>
      )}

      {googleBooksOpen && (
        <Googlebooks
          googleBooksQuery={googleBooksQuery}
          setBook={setBook}
          setGoogleBooksOpen={setGoogleBooksOpen}
        />
      )}
      {libraryBooksOpen && <ul>{searchResults}</ul>}
    </>
  );
}

export default Booksearch;
