import React, { useRef, useEffect, useState } from "react";
import Request from "axios-request-handler";
import Book from "./Book";

const Googlebooks = ({ googleBooksQuery, setBook, setGoogleBooksOpen }) => {
  const books = useRef([]);
  const [isLoading, updateIsLoading] = useState(false);
  //Asks for 40 results, max possible, and only the "volumeInfo" part
  // URL is https://www.googleapis.com/books/v1/volumes?q=${googleBooksQuery}&fields=items(volumeInfo)&maxResults=40&key=${process.env.REACT_APP_GOOGLE_API}`;
  // Using API-key-proxy-server
  // const baseURL = `https://hidden-plains-37239.herokuapp.com/googlebook`;

  useEffect(() => {
    const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${googleBooksQuery}&fields=items(volumeInfo)&maxResults=40&key=${process.env.REACT_APP_GOOGLE_API}`;

    const requestInstance = new Request(baseURL);

    updateIsLoading(true);
    // const requestInstance = new Request(baseURL, {
    //   params: {
    //     q: `${googleBooksQuery}`,
    //     fields: `items(volumeInfo)`,
    //     maxResults: `40`,
    //   },
    // });

    //I can only use books with an ISBN #
    //Filter for books that have industry identifier.
    //Then filter for books that have either ISBN 13 or ISBN 10
    //A book object containing an industryIdentifier array containing objects
    requestInstance.get().then((res) => {
      const hasIndustryIden = res.data.items.filter(
        (object) => "industryIdentifiers" in object.volumeInfo
      );
      books.current = hasIndustryIden.filter((object) => {
        const result = object.volumeInfo.industryIdentifiers.some(
          (object) => object.type === "ISBN_13" || object.type === "ISBN_10"
        );
        return result;
      });
      updateIsLoading(false);
    });
  }, [googleBooksQuery]);

  //I only need industryIdentifiers[0], either ISBN 10 or 13 will work
  //and it should have at least one of those
  let content = books.current.map((book) => (
    <Book
      book={book.volumeInfo}
      key={book.volumeInfo.industryIdentifiers[0].identifier}
      setBook={setBook}
      setGoogleBooksOpen={setGoogleBooksOpen}
    />
  ));

  return (
    <>
      <div id="isbnScroller">{isLoading ? "" : content}</div>
    </>
  );
};

export default Googlebooks;

//Object.volumeInfo.industryIdentifiers samples
// {
//     "type": "ISBN_13",
//     "identifier": "9781481414784"

// },
// {
//     "type": "ISBN_10",
//     "identifier": "148141478X"
// }
