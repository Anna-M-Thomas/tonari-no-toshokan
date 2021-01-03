import React, { useState } from "react";
import Librarysearch from "./Librarysearch";
import Booksearch from "./Booksearch";

const App = () => {
  const [mode, changeMode] = useState("book");

  const saveditems = JSON.parse(localStorage.getItem("selected"));
  const [selected, setSelected] = useState(saveditems || []);

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
        <Librarysearch selected={selected} setSelected={setSelected} />
      </>
    );
  } else if (mode === "book") {
    return (
      <>
        {menuthing}
        <Booksearch selected={selected} />
      </>
    );
  }
};

export default App;
