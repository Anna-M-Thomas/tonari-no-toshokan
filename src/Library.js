import React, {useState} from 'react';
import prefectures from './prefectures'

function Library(){
    const options = prefectures.map(prefecture=> <option value={prefecture.name_jp}>{prefecture.name_en}</option>);
    const [selected, setSelected] = useState({name_jp: "", name_en: ""});

    function handleChange(event){
        const returnedArray = prefectures.filter(prefecture => prefecture.name_jp==event.target.value);
        const selectedObject = returnedArray[0];
        setSelected(selectedObject);
    }

    return (
        <div className="library">
            <h1>You have selected {selected.name_en} and it's totally in English</h1>
           <form>
                <select value={selected.name_jp} onChange={handleChange}>
                {options}
                </select>
            </form>
        </div>
    );
}

export default Library