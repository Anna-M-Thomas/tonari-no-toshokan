import React, { useState, useEffect } from "react";
import Librarysearch from "./Librarysearch";
import Booksearch from "./Booksearch";
import Header from "./components/Header";

const App = () => {
  const [mode, changeMode] = useState("book");
  const savedlibraries = JSON.parse(localStorage.getItem("library"));
  const savedbook = JSON.parse(localStorage.getItem("book"));
  const [selectedLibraries, setSelectedLibraries] = useState(
    savedlibraries || []
  );
  const [book, setBook] = useState(savedbook || {});

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(selectedLibraries));
    localStorage.setItem("book", JSON.stringify(book));
  }, [selectedLibraries, book]);

  return (
    <>
      <Header
        changeMode={changeMode}
        mode={mode}
        selectedLibraries={selectedLibraries}
        setSelectedLibraries={setSelectedLibraries}
        book={book}
        setBook={setBook}
      />
      <main className="container">
        {mode === "library" ? (
          <Librarysearch
            selectedLibraries={selectedLibraries}
            setSelectedLibraries={setSelectedLibraries}
            book={book}
          />
        ) : (
          <Booksearch
            selectedLibraries={selectedLibraries}
            book={book}
            setBook={setBook}
          />
        )}
        <div className="about">
          <a
            href="https://github.com/sacchan9/tonari-no-toshokan/"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>
      </main>
    </>
  );
};

export default App;
