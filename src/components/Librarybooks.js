import React, { useState, useEffect } from "react";
import Request from "axios-request-handler";
import bookValue from "../assets/bookValue";

const Librarybooks = ({ search }) => {
  const [data, setData] = useState({});
  const [array, setArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const baseURL1 = "http://localhost:8080/https://api.calil.jp/check";
  // const baseURL1 = "http://localhost:3001/once";
  // const baseURL2 = "http://localhost:3001/several";
  // const fakeISBN = 4334926940;
  //  const fakesystemid = "Tokyo_Setagaya";

  useEffect(() => {
    console.log(search);
    if (!search.isbn || !search.systemid) {
      console.log("Nope, not doing it");
      return;
    }

    let session = 0;
    setLoading(true);
    const requestInstance = new Request(baseURL1, {
      params: {
        appkey: `${process.env.REACT_APP_API_KEY}`,
        isbn: `${search.isbn}`,
        systemid: `${search.systemid}`,
        format: `json`,
        callback: `no`,
      },
    });
    //const requestInstance = new Request(baseURL1);

    requestInstance.get().then((res) => {
      if (res.data.continue === 0) {
        console.log("We didn't need to poll");
        setData(res.data.books);
        setLoading(false);
      } else if (res.data.continue === 1) {
        console.log("Continue was 1, we need to start polling");
        session = res.data.session;

        const pollingInstance = new Request(baseURL1, {
          params: {
            appkey: `${process.env.REACT_APP_API_KEY}`,
            session: `${session}`,
            format: `json`,
            callback: `no`,
          },
        });

        // const pollingInstance = new Request(baseURL2);
        pollingInstance.poll(5000).get((res) => {
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
        });
      }
    });
  }, [search]);

  useEffect(() => {
    if (!search.isbn || !search.systemid || !data[search.isbn]) {
      console.log("Nope, not doing it part II");
      return;
    }

    //Get object showing book info. If empty object, saw it's empty.
    const libkey = data[search.isbn][search.systemid]["libkey"];
    const reserveurl = data[search.isbn][search.systemid]["reserveurl"];
    let infoArray = [<h3>{search.systemid.replace("_", " ")}</h3>];
    if (libkey === undefined) {
      infoArray.push(<div>No results for this book</div>);
    } else if (Object.keys(libkey).length === 0) {
      infoArray.push(<div>No results for this book</div>);
    } else {
      for (const property in libkey) {
        const status = libkey[property];
        infoArray.push(
          <div>
            Library name (Japanese): {property} Book status: {bookValue(status)}{" "}
            <a href={reserveurl} target="_blank" rel="noreferrer">
              Reserve here
            </a>
          </div>
        );
      }
    }
    setArray(infoArray);
  }, [data]);

  return isLoading ? <div>Loading....</div> : <div>{array}</div>;
};
export default Librarybooks;

//data[ISBN#]["System Id in Quotes"]["reserveurl"]
//data[ISBN#]["System Id in Quotes"]["libkey"] <==This is an object
