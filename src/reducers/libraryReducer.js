export const addLibrary = (library) => {
  return {
    type: "ADD_LIBRARY",
    data: library,
  };
};

export const clearLibraries = () => {
  return {
    type: "CLEAR_LIBRARIES",
    data: null,
  };
};

const savedLibraries = JSON.parse(localStorage.getItem("libraries"));

const libraryReducer = (state = savedLibraries || [], action) => {
  switch (action.type) {
    case "ADD_LIBRARY":
      const newLibraries = state.concat(action.data);
      localStorage.setItem("libraries", JSON.stringify(newLibraries));
      return newLibraries;
    case "CLEAR_LIBRARIES":
      localStorage.setItem("libraries", JSON.stringify(""));
      return [];
    default:
      return state;
  }
};

export default libraryReducer;
