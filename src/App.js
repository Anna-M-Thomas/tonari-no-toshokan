import React, { useState } from "react";
import Librarysearch from "./Librarysearch";
import Booksearch from "./Booksearch";
import Header from "./components/Header";

const App = () => {
  const [mode, changeMode] = useState("book");

  const saveditems = JSON.parse(localStorage.getItem("selected"));
  const savedbook = JSON.parse(localStorage.getItem("book"));
  const [selected, setSelected] = useState(saveditems || []);
  const [isbn, setISBN] = useState("");
  const [book, setBook] = useState(savedbook || {});
  const [googleBooksOpen, setGoogleBooksOpen] = useState(false);

  return (
    <>
      <Header
        changeMode={changeMode}
        selected={selected}
        setSelected={setSelected}
      />
      <main className="container">
        {mode === "library" ? (
          <Librarysearch
            selected={selected}
            isbn={isbn}
            setSelected={setSelected}
            book={book}
          />
        ) : (
          <Booksearch
            selected={selected}
            isbn={isbn}
            setISBN={setISBN}
            book={book}
            setBook={setBook}
            googleBooksOpen={googleBooksOpen}
            setGoogleBooksOpen={setGoogleBooksOpen}
          />
        )}
      </main>
    </>
  );
};

export default App;
