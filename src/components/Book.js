import React from "react";
import { useDispatch } from "react-redux";
import { setBook } from "../reducers/bookReducer";

const Book = ({ book, setResultsVisible }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(
      setBook({
        title: book.title,
        isbn: book.industryIdentifiers[0].identifier,
      })
    );

    setResultsVisible(false);
  };
  //Gets passed the volumeinfo part of book object.
  //Choosing any book (with setBook) closes the google books panel for selecting book
  //If I check for !book it doesn't work, I guess an empty object isn't falsey enough
  // if (Object.keys(book).length > 0) {
  return (
    <div className="book">
      <strong>{book.title}</strong>
      {book.hasOwnProperty("imageLinks") ? (
        <img
          className="bookImg"
          alt="book cover"
          src={`${book.imageLinks.smallThumbnail}`}
        />
      ) : (
        ""
      )}
      By {book.authors ? book.authors.slice(0, 3).join(", ") : "..."}
      <button onClick={clickHandler}>Choose</button>
    </div>
  );
};

export default Book;

// volumeInfo.title (string)
// volumeInfo.authors (array)
// volumeInfo.industryIdentifiers (array but just use [0])
// volumeInfo.imageLinks.smallThumbnail and .thumbnail
// It's possible some of these won't exist, especially image links
