import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import selectedLibrariesReducer from "./reducers/selectedLibrariesReducer";
import librariesReducer from "./reducers/librariesReducer";
import bookReducer from "./reducers/bookReducer";

const reducer = combineReducers({
  book: bookReducer,
  selectedLibraries: selectedLibrariesReducer,
  libraries: librariesReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
