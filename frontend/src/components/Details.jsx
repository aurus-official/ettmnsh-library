import React from "react";
import "../styles/details.css"

export default function Details({data}) {
    const {coverImg, title, authors, datePublished, researchAdvisers, keywords, abstractImgs} = data;

    return (
        <div className="overlay-details">
            <div className="details-container">
                <div className="allinfo-container">
                    <img className="coverImage-details" src={coverImg}/>
                    <div className="maininfo-container">
                        <h1 className="title-details">TITLE :<p>{title}</p></h1>     
                        <div className="author">AUTHOR/s :<p>{authors}</p></div>
                        <div className="datepub">PUBLISHED DATE :<p>{datePublished}</p></div>
                        <div className="resAdv">RESEARCH ADVISER/s :<p>{researchAdvisers}</p></div>
                        <div className="keywords">KEYWORD/s :<p>{keywords}</p></div>
                    </div>
                </div>
                <h3 className="sub-section">ABSTRACT</h3>
                <div className="abstract-container">
                    {abstractImgs}
                </div>
            </div> 
        </div>
    )
}
