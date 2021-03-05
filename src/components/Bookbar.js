import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBook } from "../reducers/bookReducer";

const Bookbar = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book);

  const bookClearButtonClick = () => {
    dispatch(clearBook());
  };

  return (
    <div className="topbar">
      Selected book: {book.title}
      <button onClick={bookClearButtonClick} className="alertButton">
        Clear
      </button>
    </div>
  );
};

export default Bookbar;
