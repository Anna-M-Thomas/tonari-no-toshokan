import react from "react";

const Isbnbook = ({ volumeInfo }) => {
  return (
    <li>
      Title: {volumeInfo.title}
      <br />
      Author(s): {volumeInfo.authors}
      <br />
      ISBN: {volumeInfo.industryIdentifiers[0].identifier}
    </li>
  );
};

export default Isbnbook;

//Just feed this one volumeInfo
// volumeInfo.title (string)
// volumeInfo.authors (array)
// volumeInfo.industryIdentifiers (array but just use [0])
// volumeInfo.imageLinks.smallThumbnail and .thumbnail This doesn't exist for some ummmm
//Conditionally render a pic in there using nameofobject.hasOwnProperty(imageLinks);
