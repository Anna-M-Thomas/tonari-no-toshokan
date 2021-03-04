import React, { useEffect, useState } from "react";
import googleService from "./services/googlebooks";
import Book from "./components/Book";

const Choosebook = ({ setBook }) => {
  //The one on the top handles change, the one on the bottom is final query
  const [googleBooksQuery, setGoogleBooksQuery] = useState("");
  const [finalSearch, setFinalSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, updateIsLoading] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  // Using API-key-proxy-server
  // const baseURL = `https://hidden-plains-37239.herokuapp.com/googlebook`;

  function handleChangeQuery(event) {
    setGoogleBooksQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFinalSearch(googleBooksQuery);
  };

  useEffect(() => {
    if (!finalSearch) {
      return;
    }

    updateIsLoading(true);

    //Filter for books that have industry identifier.
    //Then filter for books that have either ISBN 13 or ISBN 10
    //A book object containing an industryIdentifier array containing objects
    googleService.getBooks(finalSearch).then((result) => {
      const hasIndustryIden = result.items.filter(
        (object) => "industryIdentifiers" in object.volumeInfo
      );
      const newBooks = hasIndustryIden.filter((object) => {
        const result = object.volumeInfo.industryIdentifiers.some(
          (object) => object.type === "ISBN_13" || object.type === "ISBN_10"
        );
        return result;
      });
      setBooks(newBooks);
      updateIsLoading(false);
      setResultsVisible(true);
    });
  }, [finalSearch]);

  //I only need industryIdentifiers[0], either ISBN 10 or 13 will work
  //and it should have at least one of those
  const content = books.map((book) => (
    <Book
      book={book.volumeInfo}
      key={book.volumeInfo.industryIdentifiers[0].identifier}
      setBook={setBook}
      setResultsVisible={setResultsVisible}
    />
  ));

  return (
    <div>
      <div className="topbar">
        <form onSubmit={handleSubmit}>
          <label className="bold">
            Select a new book{" "}
            <input
              type="text"
              name="googleBook"
              placeholder="Search..."
              onChange={handleChangeQuery}
            />
          </label>
          <button type="submit">Enter</button>
        </form>
      </div>
      {resultsVisible && !isLoading ? (
        <div id="isbnScroller">{content}</div>
      ) : null}
    </div>
  );
};

export default Choosebook;
