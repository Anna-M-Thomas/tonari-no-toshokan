import React, { useState } from "react";
import Librarysearch from "./Librarysearch";
import Booksearch from "./Booksearch";
import Header from "./components/Header";

const App = () => {
  const [mode, changeMode] = useState("book");
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [book, setBook] = useState({});

  return (
    <>
      <Header changeMode={changeMode} />
      <main className="container">
        {mode === "library" ? (
          <Librarysearch
            selectedLibraries={selectedLibraries}
            setSelectedLibraries={setSelectedLibraries}
          />
        ) : (
          <Booksearch
            book={book}
            setBook={setBook}
            selectedLibraries={selectedLibraries}
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
