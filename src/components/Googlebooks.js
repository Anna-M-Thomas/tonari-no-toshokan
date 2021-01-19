import React, { useState, useEffect } from "react";
import Request from "axios-request-handler";
import Book from "./Book";

const Googlebooks = ({ googleBooksQuery, setBook, setGoogleBooksOpen }) => {
  const [books, setBooks] = useState([]);
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${googleBooksQuery}&fields=items(volumeInfo)&maxResults=40&key=${process.env.REACT_APP_GOOGLE_API}`;

  useEffect(() => {
    if (!googleBooksQuery) {
      console.log("No google books query yet, no search");
      return;
    }
    const requestInstance = new Request(baseURL);
    requestInstance.get().then((res) => {
      console.log("Reponse data items", res.data.items);
      let hasIndustryIden = res.data.items.filter(
        (object) => "industryIdentifiers" in object.volumeInfo
      );
      let hasISBN = hasIndustryIden.filter((object) => {
        let result = object.volumeInfo.industryIdentifiers.some(
          (object) => object.type === "ISBN_13" || object.type === "ISBN_10"
        );
        return result;
      });
      setBooks(hasISBN);
    });
  }, [googleBooksQuery]);

  let content = books.map((book) => (
    <Book
      book={book.volumeInfo}
      key={book.volumeInfo.industryIdentifiers[0].identifier}
      setBook={setBook}
      includeButton={true}
      setGoogleBooksOpen={setGoogleBooksOpen}
    />
  ));

  return (
    <>
      <div id="isbnScroller">{content}</div>
    </>
  );
};

export default Googlebooks;

//We've got an array of 10 objects returning
//Object.volumeInfo.industryIdentifiers array contains objects showing if got an isbn or not. We want {
//     "type": "ISBN_13",
//     "identifier": "9781481414784"

// },
// {
//     "type": "ISBN_10",
//     "identifier": "148141478X"
// }
