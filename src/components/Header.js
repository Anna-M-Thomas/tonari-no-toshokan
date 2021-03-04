import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/library">Choose libraries</Link>
          <Link to="/choosebook">Choose a book</Link>
          <Link to="/findbook">Search for book</Link>

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

{
  /* <h1>Tonari no Toshokan </h1> */
}
