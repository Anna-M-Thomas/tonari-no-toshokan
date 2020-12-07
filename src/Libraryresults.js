import React from 'react';
import Subliblist from "./Subliblist";

function Libraryresults(props){

    function getList(){
//This makes sub-categories out of each prefecture + city name
// Use .replace("_", " ") to clean up system ID for rendering
        let categories = [];

        for(let i=1; i<props.data.length; i++){
            const city = props.data[i].systemid;
            if(categories.indexOf(city)==-1) categories.push(city);
        }

//for each category, get the libraries in that category and render a sublist
        const list = categories.map((category, index)=> 
                                    <details key={index}>
                                    <summary>{category.replace("_", " ")}<button data-systemid={category} onClick={props.clickHandler}>Add to favorites</button></summary>
                                    <ul>
                                       <Subliblist data={props.data} category={category}/>
                                    </ul>
                                    </details>);
            return list;
    }

    return props.data.length ? (<div>{getList()}</div>):(<div></div>);
}

export default Libraryresults;

