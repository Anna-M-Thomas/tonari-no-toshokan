import React, {useState, useEffect} from 'react';
import Libraryresults from './Libraryresults';
import prefectures from './prefectures';

function Library(){

    const [libraries, setLibraries] = useState([]);
    const [search, setSearch] = useState({name_jp: "", name_en: ""});

    // for getting out of local storage 
    // const saveditems = JSON.parse(localStorage.getItem('items'));
    // const [items, setItems] = useState(saveditems || []);
    const [favorites, setFavorites] = useState([]);

    function handleChange(event){
        const returnedArray = prefectures.filter(prefecture => prefecture.name_jp===event.target.value);
        const selectedObject = returnedArray[0];
        setSearch(selectedObject);
    }

    useEffect(() => {
        getLibraries();
    }, [search]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }, [favorites]); 

    async function getLibraries(){
        if(search.name_jp){
            let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.calil.jp/library?appkey=${process.env.REACT_APP_API_KEY}&pref=${search.name_jp}&format=json&callback=`, {mode: 'cors'});
            if(response.ok){
                let json = await response.json();
                setLibraries(json);
            }else {
            console.log("HTTP-Error: " + response.status);
            }
        }
    }

    function clickHandler(event){
        const newFavorite = event.target.dataset.systemid;
        setFavorites(prevArray =>{
            let newArray = [...prevArray];
            newArray.push(newFavorite);
            return newArray;
        });
    }

    const options = prefectures.map((prefecture, index)=> <option value={prefecture.name_jp} key={index}>{prefecture.name_en}</option>);

    return (
        <div className="library">
            <h1>Searching for {search.name_en}</h1>
            <h2>Saved libraries: {favorites.join(", ")}</h2>
           <form>
                <select value={search.name_jp} onChange={handleChange}>
                {options}
                </select>
            </form>
            <Libraryresults clickHandler={clickHandler} data={libraries}/>
        </div>
    );
}

export default Library