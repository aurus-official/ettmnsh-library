import React, { useState } from "react";
import SchoolLogo from "../assets/logo.png"
import UserLogo from "../assets/user-logo.svg"
import "../styles/navbar.css"

export default function Navbar({props}) {
    const {propToLogin, allowLogin, userAccountName, handleFeedback} = props 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)
    
    const setUsernameFunc = (e) => {
        setUsername(e.target.value)
    }

    const setPasswordFunc = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch("https://special-related-stingray.ngrok-free.app/login", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username : username.toLowerCase(),
                password : password,
            }),
        })

        const data = await response.json()
        handleFeedback(data)
        setUsername("")
        setPassword("")

        if (!response.ok) { 
            console.error("INVALID CREDENTIALS!");
            setIncorrectCredentials(true)
            handleFeedback({})
            return;
        }

        propToLogin()
        setIncorrectCredentials(false)
    }

    const handleLogout = () => {
        propToLogin()
        handleFeedback({})
        setUsername("")
        setPassword("")
        setIncorrectCredentials(false)
    }

    
    return (
        <nav className="navbar">
            <div className="nav-container">
                <img className="nav-logo" src={SchoolLogo}></img>
                <p className="nav-title">Emiliano Tria Tirona MNIHS</p>
                {allowLogin ? 
                    <form className="form-container">
                        <input value={username} onChange={setUsernameFunc} id="username" autoComplete="on" 
                            className="input-username" type="text" placeholder={incorrectCredentials ? "INVALID USERNAME" : "USERNAME"}/>
                        <input value={password} onChange={setPasswordFunc} id="password" autoComplete="on" 
                            className="input-password" type="password" placeholder={incorrectCredentials ? "INVALID PASSWORD" : "PASSWORD"}/>
                        <button onClick={handleLogin} className="login-btn" type="submit">LOGIN</button>
                    </form> :
                    <div className="right-container">
                        <img className="user-logo" src={UserLogo}/>
                        <p className="user">{userAccountName.toUpperCase()}</p>
                        <button className="logout-btn" type="button" onClick={handleLogout}>LOGOUT</button>
                    </div>
                }
            </div>
        </nav>
    )
}

