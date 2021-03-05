export const setBook = (book) => {
  return {
    type: "SET_BOOK",
    data: book,
  };
};

export const clearBook = () => {
  return {
    type: "CLEAR_BOOK",
    data: null,
  };
};

const savedbook = JSON.parse(localStorage.getItem("book"));

const bookReducer = (state = savedbook || {}, action) => {
  switch (action.type) {
    case "SET_BOOK":
      localStorage.setItem("book", JSON.stringify(action.data));
      return action.data;
    case "CLEAR_BOOK":
      return {};
    default:
      return state;
  }
};

export default bookReducer;
