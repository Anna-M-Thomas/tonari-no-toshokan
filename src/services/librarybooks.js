import Request from "axios-request-handler";

// Usual URL is https://api.calil.jp/check, using API-key-proxy-server
//I made the mistake of naming API-key-proxy-server routes /library and /librarybook
//Which is a bad idea! Everything was going to /library and then failing. I tried test and it worked
//Test isn't a bad name, I'll keep it!
const baseURL = "https://https://api-key-proxy-server.onrender.com/test";
// const baseURL = "http://localhost:5000/test";

const polling = (session) => {
  const pollingInstance = new Request(baseURL, {
    params: {
      session: `${session}`,
      format: `json`,
      callback: `no`,
    },
  });

  return pollingInstance.get().then((response) => response.data);
};

const startPolling = (session) => {
  let result;

  const pollingInstance = new Request(baseURL, {
    params: {
      session: `${session}`,
      format: `json`,
      callback: `no`,
    },
  });

  //Polling has to wait at least two seconds between tries.
  return pollingInstance
    .poll(2000)
    .get((res) => {
      //if continue is 1, pollingInstance keeps going. Returning false stops pollingInstance
      if (res.data.continue === 0) {
        console.log("result inside startPolling", res.data.books);
        return false;
      }
    })
    .catch((error) => {
      //   setError(error.response);
      //   setLoading(false);
      console.log(error);
    });
};

const getBook = (isbn, systemid) => {
  const requestInstance = new Request(baseURL, {
    params: {
      isbn: `${isbn}`,
      systemid: `${systemid}`,
      format: `json`,
      callback: `no`,
    },
  });

  return requestInstance.get().then((response) => response.data);
};

export default { getBook, startPolling, polling };
