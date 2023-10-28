import React from "react";
import "../styles/details.css"

export default function Details({data}) {
    const {coverImg, title, authors, datePublished, researchAdvisers, keywords, abstractImgs} = data;
    let prefix = "data:image/png;base64,"
    let coverImgSrc = prefix.concat(coverImg)

    const abstractImgsElements = abstractImgs.map((base64, index) => {
        return <img className="absImg" key={index} src={prefix.concat(base64)}/>
    })

    const capitalizedTitle = title.split(" ").map((string) => {
        let firstLetter = string.charAt(0).toUpperCase()
        let rest = string.slice(1, string.length)
        return firstLetter.concat(rest);
    }).join(" ")

    const authorList = authors.join(", ")
    const resAdvList = researchAdvisers.join(", ")
    const keywordsList = keywords.join(", ")

    return (
        <div className="overlay-details">
            <div className="details-container">
                <div className="allinfo-container">
                    <img className="coverImage-details" src={coverImgSrc}/>
                    <div className="maininfo-container">
                        <h1 className="title-details">TITLE :<p>{capitalizedTitle}</p></h1>     
                        <div className="author">AUTHOR/s :<p>{authorList}</p></div>
                        <div className="datepub">PUBLISHED DATE :<p>{datePublished}</p></div>
                        <div className="resAdv">RESEARCH ADVISER/s :<p>{resAdvList}</p></div>
                        <div className="keywords">KEYWORD/s :<p>{keywordsList}</p></div>
                    </div>
                </div>
                <h3 className="sub-section">ABSTRACT</h3>
                <div className="abstract-container">
                    {abstractImgsElements}
                </div>
            </div> 
        </div>
    )
}
