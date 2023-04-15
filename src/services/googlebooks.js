import Request from "axios-request-handler";

const getBooks = (search) => {
  const baseURL = 'https://www.googleapis.com/books/v1/volumes';
  const requestInstance = new Request(baseURL, {
    params: {
      q: search,
      fields: "items(volumeInfo)",
      maxResults: 40,
      key: process.env.REACT_APP_GOOGLE_API
    },
  });
  return requestInstance.get().then((response) => response.data);
};

export default { getBooks };
