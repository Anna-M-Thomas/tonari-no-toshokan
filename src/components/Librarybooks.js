import React, { useState, useEffect } from "react";
import Request from "axios-request-handler";
import bookValue from "../assets/bookValue";

const Librarybooks = ({ search }) => {
  const [data, setData] = useState({});
  const [array, setArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseURL = "http://localhost:8080/https://api.calil.jp/check";

  useEffect(() => {
    console.log(search);

    let session = 0;
    setLoading(true);
    const requestInstance = new Request(baseURL, {
      params: {
        appkey: `${process.env.REACT_APP_API_KEY}`,
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
          console.log("We didn't need to poll");
          setData(res.data.books);
          setLoading(false);
        } else if (res.data.continue === 1) {
          console.log("Continue was 1, we need to start polling");
          session = res.data.session;

          const pollingInstance = new Request(baseURL, {
            params: {
              appkey: `${process.env.REACT_APP_API_KEY}`,
              session: `${session}`,
              format: `json`,
              callback: `no`,
            },
          });

          pollingInstance
            .poll(2000)
            .get((res) => {
              if (res.data.continue === 1) {
                console.log("Continue was 1, we need to keep polling");
                console.log("Response", res);
                session = res.data.session;
              } else {
                console.log("Continue was 0, we can stop polling!");
                console.log("Response", res);
                session = 0;
                setData(res.data.books);
                setLoading(false);
                return false;
              }
            })
            .catch((error) => setError(error));
        }
      })
      .catch((error) => setError(error));
  }, [search]);

  useEffect(() => {
    if (!search.isbn || !search.systemid || !data[search.isbn]) {
      console.log("Nope, not doing it part II");
      return;
    }

    let infoArray = [];
    //Get object showing book info. If empty object, saw it's empty.
    if (error) {
      infoArray.push(<div>{error}</div>);
      return;
    }

    const libkey = data[search.isbn][search.systemid]["libkey"];
    const reserveurl = data[search.isbn][search.systemid]["reserveurl"];
    if (libkey === undefined || Object.keys(libkey).length === 0) {
      infoArray.push(<div>No results for this book</div>);
    } else {
      for (const property in libkey) {
        const status = libkey[property];
        infoArray.push(
          <div>
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
    }
    setArray(infoArray);
  }, [data]);

  return isLoading ? (
    <li>
      <h3>{search.systemid.replace("_", " ")}</h3>
      <div>Loading....</div>
    </li>
  ) : (
    <li>
      <h3>{search.systemid.replace("_", " ")}</h3>
      <div>{array}</div>
    </li>
  );
};
export default Librarybooks;

//data[ISBN#]["System Id in Quotes"]["reserveurl"]
//data[ISBN#]["System Id in Quotes"]["libkey"] <==This is an object
