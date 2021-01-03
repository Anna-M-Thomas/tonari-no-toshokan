import React from "react";
import libraryCode from "../assets/libraryCode";

//Gets info about individual library from object and renders as part of a list
//libraryCode changes library type code (BM etc) to words (BM --> bookmobile)
function Librarydetails({ data, category }) {
  const list = data
    .filter((object) => object.systemid === category)
    .map((object) => (
      <li key={object.libid}>
        <p>Name (Japanese): {object.formal}</p>
        <p>
          <img
            src={`https://calil.jp/public/img/libicon/${object.category}.png`}
            alt={`${libraryCode[object.category]}icon`}
          />{" "}
          {libraryCode[object.category]}{" "}
        </p>
        <a
          href={`http://www.google.com/maps?q=(${object.formal})&ll==&z=15`}
          target="_blank"
        >
          Map link
        </a>{" "}
        <a href={object.url_pc} target="_blank">
          Website
        </a>{" "}
        <a href={`https://calil.jp/library/${object.libid}`} target="_blank">
          Calil page
        </a>
      </li>
    ));
  return list;
}

export default Librarydetails;

//I think a Google maps link would be this http://www.google.com/maps?q=(${object.formal})&ll==&z=15

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
