import React from "react";

const Book = ({ book, setBook, includeButton, setGoogleBooksOpen }) => {
  if (Object.keys(book).length > 0) {
    return (
      <div className="book">
        <strong>{book.title}</strong>
        {book.hasOwnProperty("imageLinks") ? (
          <img className="bookImg" src={`${book.imageLinks.smallThumbnail}`} />
        ) : (
          ""
        )}
        By {book.authors ? book.authors.slice(0, 3).join(", ") : "..."}
        {includeButton ? (
          <button
            onClick={() => {
              setBook(book);
              setGoogleBooksOpen(false);
            }}
          >
            Choose
          </button>
        ) : (
          ""
        )}
      </div>
    );
  } else return <div></div>;
};

export default Book;

//Just feed this one volumeInfo
// volumeInfo.title (string)
// volumeInfo.authors (array)
// volumeInfo.industryIdentifiers (array but just use [0])
// volumeInfo.imageLinks.smallThumbnail and .thumbnail This doesn't exist for some ummmm
//Conditionally render a pic in there using nameofobject.hasOwnProperty(imageLinks);
