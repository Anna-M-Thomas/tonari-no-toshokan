import React, { useState } from "react";
import Librarybooks from "./components/Librarybooks";

function Findbook({ selectedLibraries, book, setBook }) {
  const [libraryBookSearch, setLibraryBookSearch] = useState([]);

  const bookClearButtonClick = () => {
    setBook({});
  };

  function handleLibraryBookSearch(event) {
    event.preventDefault();
    if (Object.keys(book).length > 0 && selectedLibraries) {
      let newArray = selectedLibraries.map((library) => {
        return {
          systemid: library,
          isbn: book.isbn,
        };
      });
      setLibraryBookSearch(newArray);
    }
  }

  let searchResults = libraryBookSearch.map((library) => (
    <Librarybooks search={library} key={library.systemid} />
  ));

  return (
    <div className="container">
      {Object.keys(book).length > 0 && (
        <div className="topbar">
          Selected book: {book.title}
          <button onClick={bookClearButtonClick} className="alertButton">
            Clear
          </button>
        </div>
      )}
      <form onSubmit={handleLibraryBookSearch} className="topbar">
        <button type="submit">Search libraries for your book</button>
      </form>
      {<ul>{searchResults}</ul>}
    </div>
  );
}

export default Findbook;
