import React, { useState, useEffect } from "react";
import librarybooksHandler from "../services/librarybooks";
import bookValue from "../assets/bookValue";

//search is an object containing the selected book's ISBN and the library system id, passed to this component
const Librarybooks = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let timerId;
    let counter = 1;
    setLoading(true);

    const pollFunction = (session) => {
      librarybooksHandler
        .polling(session)
        .then((result) => {
          counter++;
          if (result.continue === 0 || counter === 5) {
            clearInterval(timerId);
            setData(result.books);
            setLoading(false);
            counter = 0;
          }
        })
        .catch((error) => {
          clearInterval(timerId);
          console.log(error);
        });
    };

    librarybooksHandler.getBook(search.isbn, search.systemid).then((result) => {
      if (result.continue === 0) {
        setData(result.books);
        setLoading(false);
      } else if (result.continue === 1) {
        timerId = setInterval(() => pollFunction(result.session), 5000);
      }
    });
  }, [search]);

  const returnArray = () => {
    console.log("data in return array", data);
    if (search.isbn in data) {
      const libkey = data[search.isbn][search.systemid]["libkey"];
      //No results if libkey is empty (this means there was no book)
      if (libkey === undefined || Object.keys(libkey).length === 0) {
        return <div>No results for this book</div>;
      } else {
        let array = [];
        for (const property in libkey) {
          array.push(
            <div key={property}>
              Branch: {property} Book status: {bookValue(libkey[property])}{" "}
              <a
                href={data[search.isbn][search.systemid]["reserveurl"]}
                target="_blank"
                rel="noreferrer"
              >
                Reserve here
              </a>{" "}
              <a
                href={`https://calil.jp/library/search?s=${search.systemid}&k=${property}`}
                target="_blank"
                rel="noreferrer"
              >
                Calil page
              </a>
            </div>
          );
        }
        return array;
      }
    } else {
      return <div>No data</div>;
    }
  };

  return (
    <li>
      <h3>{search.systemid.replace("_", " ")}</h3>
      {isLoading ? <div>Loading....</div> : <>{returnArray()}</>}
    </li>
  );
};
export default Librarybooks;

//data[ISBN#]["System Id in Quotes"]["reserveurl"]
//data[ISBN#]["System Id in Quotes"]["libkey"] <==This is an object
