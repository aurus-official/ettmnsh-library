import React, { useState } from "react";
import "../styles/signupform.css"

export default function SignUpForm({showToggle}) {
    const [user, setUserState] = useState({
        username: "",
        password: "",
        confirmedpassword: "",
        usernameColorLabel : "",
        passwordColorLabel : "",
        confpasswordColorLabel : ""
    })
    const [status, setStatus] = useState({})


    function onInfoChange(event) {
        let element = event.target
        setUserState((previousObject) => ({...previousObject, [element.name] : element.value}))
    }

    function onCloseTrigger(event)  {
        const isOutsideClicked = event.target.classList.contains("overlay-container");
        if (isOutsideClicked) {
            showToggle();
        }
        
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function onPostInfo(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    ...user,
                    username : user.username.toLowerCase(),
                }),
            })

            const data = await response.json()
            setStatus(data) 
            setUserState(() => ({username : "", 
                password : "", 
                confirmedpassword : "", 
                usernameColorLabel : "", 
                passwordColorLabel : "",
                confpasswordColorLabel : ""
            }))

            setStatus((prevObj) => ({
                ...prevObj,
                "username" : data.username,
                "password" : data.password,
                "usernameColorLabel" : data.usernameColorLabel,
                "passwordColorLabel" : data.passwordColorLabel,
                "confpasswordColorLabel" : data.confpasswordColorLabel,
            }))

            await sleep(2000)

        } catch (exception) {
            console.error("An error occured.")
        }
        setUserState(() => ({username : "", password : "", confirmedpassword : ""}))
    }

    return (
        <div onClick={onCloseTrigger} className="overlay-container">
            <div className="signup-container">
                <h1 className="signup-title">SIGN UP</h1>
                <form className="signupform-container">
                    <input name="username" onChange={onInfoChange} value={user.username} autoComplete="on" placeholder="Username" id="username-input" type="text" />
                    <label style={{color : status.usernameColorLabel}} htmlFor="username-input">{status.hasOwnProperty("username") ? status.username : "* REQUIRED"}</label>

                    <input name="password" onChange={onInfoChange} value={user.password} placeholder="Password" id="passw-input" type="password" />
                    <label style={{color : status.passwordColorLabel}} htmlFor="passw-input">{status.hasOwnProperty("password") ? status.password : "* REQUIRED"}</label>

                    <input name="confirmedpassword" onChange={onInfoChange} value={user.confirmedpassword} placeholder="Confirm Password" id="confirm-password" type="password" />
                    <label style={{color : status.confpasswordColorLabel}} htmlFor="confirm-password">{status.hasOwnProperty("confirmedpassword") ? status.confirmedpassword : "* REQUIRED"}</label>

                    <button className="signup-submit" onClick={onPostInfo} type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}
