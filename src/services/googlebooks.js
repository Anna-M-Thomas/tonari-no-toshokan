import Request from "axios-request-handler";

const getBooks = (search) => {
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${search}&fields=items(volumeInfo)&maxResults=40&key=${process.env.REACT_APP_GOOGLE_API}`;

  const requestInstance = new Request(baseURL);
  return requestInstance.get().then((response) => response.data);
};

export default { getBooks };

// const requestInstance = new Request(baseURL, {
//   params: {
//     q: `${googleBooksQuery}`,
//     fields: `items(volumeInfo)`,
//     maxResults: `40`,
//   },
// });
