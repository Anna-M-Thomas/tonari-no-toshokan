import react from "react";

const Book = ({ book, setBook, includeButton, setGoogleBooksOpen }) => {
  if (Object.keys(book).length > 0)
    return (
      <div className="isbnBook">
        {book.title}
        <br />
        {book.hasOwnProperty("imageLinks") ? (
          <img src={`${book.imageLinks.smallThumbnail}`} />
        ) : (
          ""
        )}
        <br />
        Author(s): {book.authors}
        <br />
        ISBN: {book.industryIdentifiers[0].identifier}
        {includeButton ? (
          <button
            onClick={() => {
              setBook(book);
              setGoogleBooksOpen(false);
              localStorage.setItem("book", JSON.stringify(book));
            }}
          >
            Set book
          </button>
        ) : (
          ""
        )}
      </div>
    );
  else return <div></div>;
};

export default Book;

//Just feed this one volumeInfo
// volumeInfo.title (string)
// volumeInfo.authors (array)
// volumeInfo.industryIdentifiers (array but just use [0])
// volumeInfo.imageLinks.smallThumbnail and .thumbnail This doesn't exist for some ummmm
//Conditionally render a pic in there using nameofobject.hasOwnProperty(imageLinks);
