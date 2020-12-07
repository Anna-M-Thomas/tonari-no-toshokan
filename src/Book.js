import React, {useState, useEffect} from 'react';

function Book() {
  const favoritesArray = JSON.parse(window.localStorage.getItem('favorites'));
  const someJSX = favoritesArray.map((item, index) => <h2 key={index}>{item}</h2>);

  const [isbn, setISBN] = useState(0);
  const [books, setBooks] = useState("");

  function handleChange(event){
    setISBN(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    getBooks();
  }
//I need to do something called polling, use this? https://www.npmjs.com/package/react-polling
  async function getBooks(){
    console.log(favoritesArray[0]);
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.calil.jp/check?appkey=${process.env.REACT_APP_API_KEY}&isbn=${isbn}&systemid=${favoritesArray[0]}&format=json&callback=no`, {mode: 'cors'});
        if(response.ok){
            let json = await response.json();
            if(json.continue==1){
              let session = json.session;
              response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.calil.jp/check?appkey=${process.env.REACT_APP_API_KEY}&session=${session}&format=json&callback=no`, {mode: 'cors'});
            }
          }else {
        console.log("HTTP-Error: " + response.status);
        }
  }

  return (
    <div className="Book">
      These are your favorites: {someJSX}
      Let's search for a book! Enter an ISBN.
        <form onSubmit={handleSubmit}>
          <label>ISBN:
                  <input 
                      type="text"
                      name="isbn"
                      placeholder="ISBN #"
                      onChange={handleChange}
                  /> 
          </label>
          <button>Search</button>
        </form>
    </div>
  );
}

export default Book;
