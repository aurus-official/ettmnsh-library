import React, { useState } from "react";
import "../styles/card.css"
import Details from "./Details";

export default function Card({data}) {
    const {coverImg, title} = data;
    const [showDetails, setShowDetails] = useState(false)
    let coverImgSrc = "data:image/png;base64,".concat(coverImg)
    const capitalizedTitle = title.split(" ").map((string) => {
        let firstLetter = string.charAt(0).toUpperCase()
        let rest = string.slice(1, string.length)
        return firstLetter.concat(rest);
    }).join(" ")

    function handleClick() {
        setShowDetails((prevValue) => !prevValue)
    }
 
    return (
        <div className="card-container" onClick={handleClick}>
            <img className="coverImage" src={coverImgSrc}/>
            <h1 className="title">{capitalizedTitle}</h1>     
            {showDetails && <Details data={data}/>}
        </div>
    )
}
