import libraryService from "../services/libraries";

export const setLibraries = (prefecture) => {
  return async (dispatch) => {
    const libraries = await libraryService.getLibraries(prefecture);
    dispatch({
      type: "SET_LIBRARIES",
      data: libraries,
    });
  };
};

const librariesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LIBRARIES":
      return action.data;
    default:
      return state;
  }
};

export default librariesReducer;
