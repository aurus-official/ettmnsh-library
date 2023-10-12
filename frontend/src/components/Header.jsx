import React from "react";
import HeaderImage from "../assets/library.jpg"
import "../styles/header.css"

export default function Header({showToggle}) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="image-container">
                    <img className="header-image" src={HeaderImage}/> 
                    <p className="header-title main-title">ONLINE PUBLIC ACCESS
                        <span className="header-title-effect"> CATALOG </span></p>
                    <div className="header-buttons">
                        <button className="header-learnmore" type="submit" onClick={showToggle}>SIGN UP NOW</button>
                        <button className="header-search" type="submit">START USING</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
