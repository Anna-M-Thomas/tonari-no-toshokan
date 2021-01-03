import React, { useState } from "react";
import Librarysearch from "./Librarysearch";
import Booksearch from "./Booksearch";

const App = () => {
  const [mode, changeMode] = useState("book");

  const saveditems = JSON.parse(localStorage.getItem("favorites"));
  const [favorites, setFavorites] = useState(saveditems || []);

  const handleChange = () => {
    changeMode(mode === "library" ? "book" : "library");
  };

  const menuthing = (
    <div id="menuthing">
      <button onClick={handleChange}>
        Change to {mode === "library" ? "book" : "library"} mode
      </button>
    </div>
  );

  if (mode === "library") {
    return (
      <>
        {menuthing}
        <Librarysearch favorites={favorites} setFavorites={setFavorites} />
      </>
    );
  } else if (mode === "book") {
    return (
      <>
        {menuthing}
        <Booksearch favorites={favorites} />
      </>
    );
  }
};

export default App;
