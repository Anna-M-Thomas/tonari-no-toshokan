import React, { useState, useEffect } from "react";
import Request from "axios-request-handler";

const Books = ({ search }) => {
  const [data, setData] = useState({});
  const [string, setString] = useState("");
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

    let tempString = "";
    const libkey = data[search.isbn][search.systemid]["libkey"] || {};
    if (libkey) {
      for (const property in libkey) {
        tempString += `Library name (Japanese): ${property} Book status: ${libkey[property]} `;
      }
      setString(tempString);
    }
  }, [data]);

  return <div>{string}</div>;
};
export default Books;

//data[ISBN#]["System Id in Quotes"]["reserveurl"]
//data[ISBN#]["System Id in Quotes"]["libkey"] <==This is an object

//Possible values  貸出可、 蔵書あり、 館内のみ、 貸出中、 予約中、 準備中、 休館中、 蔵書なし
//EXCEPT there might be unique values, so make sure to include an extra option showing "other" and Japanese
