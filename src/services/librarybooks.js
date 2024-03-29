import Request from "axios-request-handler";

const baseURL = "https://api.calil.jp/check";

const polling = (session) => {
  const pollingInstance = new Request(baseURL, {
    params: {
      session: `${session}`,
      format: `json`,
      callback: `no`,
      appkey: process.env.REACT_APP_API_KEY
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
