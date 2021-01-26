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

  const bookClearButtonClick = () => {
    setBook({});
  };

  function handleGoogleBooksSearch(event) {
    event.preventDefault();
    if (googleBooksQuery) {
      setGoogleBooksOpen(true);
      setLibraryBooksOpen(false);
    }
  }

  function handleLibraryBookSearch(event) {
    event.preventDefault();
    console.log("I've been clicked");
    console.log("first", Object.keys(book).length > 0);
    console.log("second", selectedLibraries);
    if (Object.keys(book).length > 0 && selectedLibraries) {
      console.log("Inside handle library book search");
      let newArray = selectedLibraries.map((library) => {
        return {
          systemid: library,
          isbn: book.isbn,
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
      {Object.keys(book).length > 0 && (
        <div className="topbar">
          Selected book: {book.title}
          <button onClick={bookClearButtonClick} className="alertButton">
            Clear
          </button>
        </div>
      )}
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
