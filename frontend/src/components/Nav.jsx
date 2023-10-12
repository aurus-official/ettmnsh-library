import React, { useState } from "react";
import SchoolLogo from "../assets/logo.png"
import "../styles/navbar.css"

export default function Navbar() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const setUsernameFunction = (e) => {
        setUsername(e.target.value)
    }

    const setPasswordFunction = (e) => {
        setPassword(e.target.value)
    }

    const printToConsole = () => {
   //     console.log(username, password)
    }

    
    return (
        <nav className="navbar">
            <div className="nav-container">
                <img className="nav-logo" src={SchoolLogo}></img>
                <p className="nav-title">Emiliano Tria Tirona MNIHS</p>
                <form className="form-container" role="search">
                    <input value={username} onChange={setUsernameFunction} id="username" autoComplete="on" className="input-username" type="text" placeholder="Username"/>
                    <input value={password} onChange={setPasswordFunction} id="password" autoComplete="on" className="input-password" type="password" placeholder="Password"/>
                    <button onClick={printToConsole} className="form-btn" type="submit">LOGIN</button>
                </form>
            </div>
        </nav>
    )
}

