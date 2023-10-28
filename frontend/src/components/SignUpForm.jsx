import React, { useState } from "react";
import "../styles/signupform.css"

export default function SignUpForm({functions}) {
    const [user, setUserState] = useState({
        username: "",
        password: "",
        confirmedpassword: "",
        usernameColorLabel : "",
        passwordColorLabel : "",
        confpasswordColorLabel : ""
    })

    const {propToSignUp, propToLogin, handleFeedback, feedback} = functions;

    function onInfoChange(event) {
        let element = event.target
        setUserState((previousObject) => ({...previousObject, [element.name] : element.value}))
    }

    function onCloseTrigger(event)  {
        const isOutsideClicked = event.target.classList.contains("overlay-container");
        if (isOutsideClicked) {
            propToSignUp()
        }
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function onPostInfo(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://special-related-stingray.ngrok-free.app/signup", {
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
            handleFeedback(data)

            setUserState(() => ({username : "", 
                password : "", 
                confirmedpassword : "", 
                usernameColorLabel : "", 
                passwordColorLabel : "",
                confpasswordColorLabel : ""
            }))

            if (response.ok) {
                await sleep(1000)
                propToSignUp()
                await sleep(1000)
                propToLogin()
            }


        } catch (exception) {
            console.error(exception)
        }
    }

    return (
        <div onClick={onCloseTrigger} className="overlay-container">
            <div className="signup-container">
                <h1 className="signup-title">SIGN UP</h1>
                <form className="signupform-container">
                    <input name="username" onChange={onInfoChange} value={user.username} autoComplete="on" placeholder="Username" id="username-input" type="text" />
                    <label style={{color : feedback.usernameColorLabel}} htmlFor="username-input">{feedback.hasOwnProperty("username") ? feedback.username : "* REQUIRED"}</label>

                    <input name="password" onChange={onInfoChange} value={user.password} placeholder="Password" id="passw-input" type="password" />
                    <label style={{color : feedback.passwordColorLabel}} htmlFor="passw-input">{feedback.hasOwnProperty("password") ? feedback.password : "* REQUIRED"}</label>

                    <input name="confirmedpassword" onChange={onInfoChange} value={user.confirmedpassword} placeholder="Confirm Password" id="confirm-password" type="password" />
                    <label style={{color : feedback.confpasswordColorLabel}} htmlFor="confirm-password">{feedback.hasOwnProperty("confirmedpassword") ? feedback.confirmedpassword : "* REQUIRED"}</label>

                    <button className="signup-submit" onClick={onPostInfo} type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}
