import React from 'react';

function Book() {
  const favoritesArray = JSON.parse(window.localStorage.getItem('favorites'));
const someJSX = favoritesArray.map(item => <h2>{item}</h2>);
  
  return (
    <div className="Book">
      These are your favorites: {someJSX}
    </div>
  );
}

export default Book;
