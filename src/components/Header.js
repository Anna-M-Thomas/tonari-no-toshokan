import React from "react";

const Header = ({
  changeMode,
  selectedLibraries,
  setSelectedLibraries,
  setBook,
  book,
}) => {
  const handleLibraryClick = () => {
    changeMode("library");
  };

  const handleBookClick = () => {
    changeMode("book");
  };

  const libraryClearButtonClick = () => {
    setSelectedLibraries([]);
    localStorage.setItem("library", JSON.stringify([]));
  };

  const bookClearButtonClick = () => {
    setBook({});
    localStorage.setItem("book", JSON.stringify({}));
  };

  return (
    <>
      <div id="headerContainer">
        <div id="header">
          <img
            className="headerImg"
            alt="bookmobile"
            src="./car_book_idou_tosyokan.png"
          />
          <h1>
            <button onClick={handleLibraryClick}>Choose libraries</button>
            Tonari no Toshokan{" "}
            <button onClick={handleBookClick}>Search for a book</button>
          </h1>
          <img className="headerImg" alt="book" src="./book_yoko.png" />
        </div>
      </div>
      {selectedLibraries.length > 0 ? (
        <div className="topbar">
          Selected libraries:{" "}
          {selectedLibraries
            .map((item) => item.systemid.replace("_", " "))
            .join(", ")}
          <button onClick={libraryClearButtonClick} className="alertButton">
            Clear
          </button>{" "}
        </div>
      ) : (
        <div className="topbar">No library selected yet</div>
      )}
      {Object.keys(book).length > 0 ? (
        <div className="topbar">
          Selected book: {book.title}
          <button onClick={bookClearButtonClick} className="alertButton">
            Clear
          </button>
        </div>
      ) : (
        <div className="topbar">No book selected yet</div>
      )}
    </>
  );
};

export default Header;
