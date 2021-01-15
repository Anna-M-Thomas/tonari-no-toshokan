import React, { useState, useEffect } from "react";
import Librarybooks from "./components/Librarybooks";
import Book from "./components/Book";
import Googlebooks from "./components/Googlebooks";

function Booksearch({
  selected,
  book,
  setBook,
  googleBooksOpen,
  setGoogleBooksOpen,
}) {
  const [googleBooksQuery, setGoogleBooksQuery] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [search, setSearch] = useState([]);

  function handleChangeQuery(event) {
    setGoogleBooksQuery(event.target.value);
  }

  function handleIsbnQuery(event) {
    event.preventDefault();
    if (googleBooksQuery) {
      setIsbnSearch(googleBooksQuery);
      setGoogleBooksOpen(true);
    }
  }

  function handleLibraryBookSearch(event) {
    event.preventDefault();
    if (book) {
      let newArray = selected.map((library) => {
        return {
          systemid: library,
          isbn: book.industryIdentifiers[0].identifier,
        };
      });
      setSearch(newArray);
    }
  }

  return (
    <div className="Book">
      <div className="bookTop">
        <div className="selectedBook">
          <p>Selected book:</p>
          <Book book={book} setBook={setBook} includeButton={false} />
          <form onSubmit={handleIsbnQuery}>
            <label>
              Search for another book
              <input
                type="text"
                name="isbnSearch"
                placeholder="Search..."
                onChange={handleChangeQuery}
              />
            </label>
            <button type="submit">Enter</button>
          </form>
        </div>
        {googleBooksOpen ? (
          <Googlebooks
            isbnSearch={isbnSearch}
            setBook={setBook}
            setGoogleBooksOpen={setGoogleBooksOpen}
          />
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleLibraryBookSearch} id="search_library_for_book">
        <button type="submit" form="search_library_for_book">
          Search for book
        </button>
      </form>
      <br />
      {search.map((library) => (
        <Librarybooks search={library} key={library.systemid} />
      ))}
    </div>
  );
}

export default Booksearch;
