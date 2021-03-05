import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import libraryReducer from "./reducers/libraryReducer";
import bookReducer from "./reducers/bookReducer";

const reducer = combineReducers({
  book: bookReducer,
  libraries: libraryReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
