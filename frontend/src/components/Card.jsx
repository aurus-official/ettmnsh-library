import React, { useState } from "react";
import "../styles/card.css"
import Details from "./Details";

export default function Card({data}) {
    const {coverImg, title} = data;
    const [showDetails, setShowDetails] = useState(false)

    function handleClick() {
        setShowDetails((prevValue) => !prevValue)
    }
 
    return (
        <div className="card-container" onClick={handleClick}>
            <img className="coverImage" src={coverImg}/>
            <h1 className="title">{title}</h1>     
            {showDetails && <Details data={data}/>}
        </div>
    )
}
