import Request from "axios-request-handler";

// URL is https://api.calil.jp/library, using API-key-proxy-server
const baseURL = "https://api-key-proxy-server.onrender.com/library";
//const baseURL = "http://localhost:5000/library";

const getLibraries = (prefecture) => {
  const requestInstance = new Request(baseURL, {
    params: {
      pref: `${prefecture}`,
      format: `json`,
      callback: ``,
      mode: "cors",
    },
  });
  return requestInstance.get().then((response) => response.data);
};

export default { getLibraries };
