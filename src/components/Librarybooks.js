import React, { useState, useEffect, useRef } from "react";
import Request from "axios-request-handler";
import bookValue from "../assets/bookValue";

//search is an object containing the selected book's ISBN and the library system id, passed to this component
const Librarybooks = ({ search }) => {
  const data = useRef({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Usual URL is https://api.calil.jp/check, using API-key-proxy-server
  //I made the mistake of naming API-key-proxy-server routes /library and /librarybook
  //Which is a bad idea! Everything was going to /library and then failing. I tried test and it worked
  //Test isn't a bad name, I'll keep it!
  // const baseURL = "https://hidden-plains-37239.herokuapp.com/test";
  const baseURL =
    "https://cors-anywhere.herokuapp.com/https://api.calil.jp/check";

  //startPolling is its own function that request will start running when needed
  const startPolling = (session) => {
    const pollingInstance = new Request(baseURL, {
      params: {
        session: `${session}`,
        format: `json`,
        callback: `no`,
      },
    });
    //Polling has to wait at least two seconds between tries.
    pollingInstance
      .poll(2000)
      .get((res) => {
        //if continue is 1, pollingInstance keeps going. Returning false stops pollingInstance
        if (res.data.continue === 0) {
          session = 0;
          data.current = res.data.books;
          setLoading(false);
          return false;
        }
      })
      .catch((error) => {
        setError(error.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    let session = 0;
    setLoading(true);

    const requestInstance = new Request(baseURL, {
      params: {
        isbn: `${search.isbn}`,
        systemid: `${search.systemid}`,
        format: `json`,
        callback: `no`,
      },
    });

    requestInstance
      .get()
      .then((res) => {
        if (res.data.continue === 0) {
          data.current = res.data.books;
          setLoading(false);
        } else if (res.data.continue === 1) {
          //If library responds continue = 1 we have to start polling
          session = res.data.session;
          startPolling(session);
        }
      })
      .catch((error) => {
        setError(error.response);
        setLoading(false);
      });
  }, [search]);

  const returnArray = () => {
    console.log("data current", data.current);
    //In theory, if an error comes back it will be displayed...
    if (error) {
      return (
        <div>
          Error: {error.status} {error.statusText}
        </div>
      );
    }
    if (search.isbn in data.current) {
      const libkey = data.current[search.isbn][search.systemid]["libkey"];
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
                href={data.current[search.isbn][search.systemid]["reserveurl"]}
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
