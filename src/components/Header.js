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

  const bookClearButtonClick = () => {
    setBook({});
    localStorage.setItem("book", JSON.stringify({}));
  };

  return (
    <>
      <div id="headerContainer">
        <div id="header">
          <picture>
            <img
              className="headerImg"
              alt="bookmobile"
              src="./car_book_idou_tosyokan.png"
            />
            <source srcSet="./car_book_idou_tosyokan.webp" type="image/webp" />
          </picture>
          <button onClick={handleLibraryClick}>Choose libraries</button>
          <h1>Tonari no Toshokan </h1>
          <button onClick={handleBookClick}>Search for a book</button>
          <picture>
            <img className="headerImg" alt="book" src="./book_yoko.png" />
            <source srcSet="./book_yoko.webp" type="image/webp" />
          </picture>
        </div>
      </div>

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
