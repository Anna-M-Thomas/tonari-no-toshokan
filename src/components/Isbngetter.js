import react, { useState, useEffect } from "react";
import Request from "axios-request-handler";
import Isbnbook from "./Isbnbook";

const Isbngetter = ({ isbnSearch }) => {
  const [books, setBooks] = useState([]);
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${isbnSearch}&fields=items(volumeInfo)&maxResults=40&key=${process.env.REACT_APP_GOOGLE_API}`;

  useEffect(() => {
    if (!isbnSearch) {
      console.log("isbnSearch is still empty");
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
  }, [isbnSearch]);

  let content = books.map((book) => <Isbnbook volumeInfo={book.volumeInfo} />);

  const first10 = [...content];
  first10.length = Math.min(first10.length, 10);

  return (
    <>
      <h4>Isbngetter!!!</h4>
      <ul>{first10}</ul>
    </>
  );
};

export default Isbngetter;

//We've got an array of 10 objects returning
//Object.volumeInfo.industryIdentifiers array contains objects showing if got an isbn or not. We want {
//     "type": "ISBN_13",
//     "identifier": "9781481414784"

// },
// {
//     "type": "ISBN_10",
//     "identifier": "148141478X"
// }
