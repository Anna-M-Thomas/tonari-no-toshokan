import React from "react";

const Header = ({ changeMode }) => {
  const handleLibraryClick = () => {
    changeMode("library");
  };

  const handleBookClick = () => {
    changeMode("book");
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
    </>
  );
};

export default React.memo(Header);
