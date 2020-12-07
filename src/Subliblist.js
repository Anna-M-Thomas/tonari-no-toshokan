import React from 'react';


function Subliblist(props){
    const categoryKey = {"BM": "Bookmobile", 
                        "SMALL": "Library room/comm. center",
                        "MEDIUM": "Local library",
                        "LARGE": "Wider-area library",
                        "UNIV": "University library",
                        "SPECIAL": "Specalized library",
                        "BM": "Bookmobile"
                        }

    const list = props.data.filter(object=>object.systemid==props.category)
                            .map(object=>
                            <li key={object.libid}>
                                Japanese name: {object.formal} <img src={`https://calil.jp/public/img/libicon/${object.category}.png`} /> {categoryKey[object.category]}
                            </li>)
    return list;
}

export default Subliblist;

/* a sample object 
address: "岩手県九戸郡軽米町軽米8-54"
category: "BM"
​​​city: "九戸郡軽米町"
​​​faid: null
​​​formal: "軽米町移動図書館「やまなみ号」"
​​​geocode: "141.4634603,40.3256846"
​​​isil: null
​​​libid: "110132"
​​​libkey: "やまなみ号"
​​​post: "028-6302"
​​​pref: "岩手県"
​​​primary: false
​​​short: "やまなみ号"
​​​systemid: "Iwate_Karumai"
​​​systemname: "岩手県軽米町"
​​​tel: "0195-46-4333"
​​​url_pc: "https://ilisod001.apsel.jp/karumai_library/wopc/pc/pages/TopPage.jsp"*/