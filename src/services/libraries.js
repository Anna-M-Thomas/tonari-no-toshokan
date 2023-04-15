import Request from "axios-request-handler";

const baseURL = 'https://api.calil.jp/library';

const getLibraries = (prefecture) => {
  const requestInstance = new Request(baseURL, {
    params: {
      pref: `${prefecture}`,
      format: `json`,
      callback: ``,
      mode: "cors",
      appkey: process.env.REACT_APP_API_KEY
    },
  });
  return requestInstance.get().then((response) => response.data);
};

export default { getLibraries };
