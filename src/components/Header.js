import React from "react";

const Header = ({ changeMode, selected, setSelected }) => {
  const handleLibraryClick = () => {
    changeMode("library");
  };

  const handleBookClick = () => {
    changeMode("book");
  };

  const handleClearButtonClick = () => {
    setSelected([]);
    localStorage.setItem("selected", JSON.stringify([]));
  };

  const selectedHeader =
    selected.length > 0 ? (
      <div className="selected">
        Selected libraries:{" "}
        {selected.map((item) => item.replace("_", " ")).join(", ")}
        <button onClick={handleClearButtonClick}>Clear libraries</button>
      </div>
    ) : (
      <div className="selected">No library selected yet</div>
    );

  return (
    <div id="headerContainer">
      <div id="header">
        <img className="headerImg" src="./car_book_idou_tosyokan.png" />
        <h1>
          <button onClick={handleLibraryClick}>Choose libraries</button>
          Tonari no Toshokan{" "}
          <button onClick={handleBookClick}>Search for a book</button>
        </h1>
        <img className="headerImg" src="./book_yoko.png" />
      </div>
      {selectedHeader}
    </div>
  );
};

export default Header;
