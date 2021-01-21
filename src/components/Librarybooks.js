import React, { useState, useEffect } from "react";
import Request from "axios-request-handler";
import bookValue from "../assets/bookValue";

//search is an object containing the selected book's ISBN and the library system id, passed to this component
const Librarybooks = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = "https://api.calil.jp/check";

  //startPolling is its own function that request will start running when needed
  const startPolling = (session) => {
    const pollingInstance = new Request(baseURL, {
      params: {
        appkey: `${process.env.REACT_APP_API_KEY}`,
        session: `${session}`,
        format: `json`,
        callback: `no`,
        mode: "cors",
      },
    });
    //Polling has to wait at least two seconds between tries.
    pollingInstance
      .poll(2000)
      .get((res) => {
        //if continue is 1, pollingInstance keeps going. Returning false stops pollingInstance
        if (res.data.continue === 0) {
          session = 0;
          setData(res.data.books);
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
        appkey: `${process.env.REACT_APP_API_KEY}`,
        isbn: `${search.isbn}`,
        systemid: `${search.systemid}`,
        format: `json`,
        callback: `no`,
        mode: "cors",
      },
    });

    requestInstance
      .get()
      .then((res) => {
        if (res.data.continue === 0) {
          setData(res.data.books);
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
    //In theory, if an error comes back it will be displayed...
    if (error) {
      return (
        <div>
          Error: {error.status} {error.statusText}
        </div>
      );
    }
    if (search.isbn in data) {
      const libkey = data[search.isbn][search.systemid]["libkey"];
      const reserveurl = data[search.isbn][search.systemid]["reserveurl"];
      //No results if libkey is empty (this means there was no book)
      if (libkey === undefined || Object.keys(libkey).length === 0) {
        return <div>No results for this book</div>;
      } else {
        let array = [];
        for (const property in libkey) {
          const status = libkey[property];
          array.push(
            <div key={property}>
              Branch: {property} Book status: {bookValue(status)}{" "}
              <a href={reserveurl} target="_blank" rel="noreferrer">
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
      {isLoading ? <div>Loading....</div> : <div>{returnArray()}</div>}
    </li>
  );
};
export default Librarybooks;

//data[ISBN#]["System Id in Quotes"]["reserveurl"]
//data[ISBN#]["System Id in Quotes"]["libkey"] <==This is an object
