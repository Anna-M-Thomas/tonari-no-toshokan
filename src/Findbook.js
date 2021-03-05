import React, { useState } from "react";
import { useSelector } from "react-redux";

import Librarybooks from "./components/Librarybooks";

function Findbook() {
  const [libraryBookSearch, setLibraryBookSearch] = useState([]);
  const selectedLibraries = useSelector((state) => state.selectedLibraries);
  const book = useSelector((state) => state.book);

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
      <form onSubmit={handleLibraryBookSearch} className="topbar">
        <button type="submit">Search libraries for your book</button>
      </form>
      {<ul>{searchResults}</ul>}
    </div>
  );
}

export default Findbook;
