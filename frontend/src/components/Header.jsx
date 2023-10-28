import React from "react";
import "../styles/header.css"

export default function Header({functions}) {
    const {propToSignUp} = functions
    return (
        <header className="header">
            <div className="header-container">
                <p className="header-title main-title">ONLINE PUBLIC ACCESS
                    <span className="header-title-effect"> CATALOG </span></p>
                <div className="header-buttons">
                    <button className="header-signup" type="submit" onClick={propToSignUp}>SIGN UP NOW</button>
                </div>
            </div>
        </header>
    )
}
