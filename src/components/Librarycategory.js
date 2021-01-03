import React from "react";
import Subliblist from "./Subliblist";

const Librarycategory = (props) => {
  return (
    <details key={props.index}>
      <summary>
        {props.category.replace("_", " ")}
        <button
          data-systemid={props.category}
          onClick={props.handleFavoriteButtonClick}
        >
          Add to favorites
        </button>
      </summary>
      <ul>
        <Subliblist data={props.data} category={props.category} />
      </ul>
    </details>
  );
};

export default Librarycategory;
