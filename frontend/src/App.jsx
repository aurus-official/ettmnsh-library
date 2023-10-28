import React, { useState } from 'react';
import Navbar from './components/Nav.jsx'
import Header from './components/Header.jsx';
import SignUpForm from './components/SignUpForm.jsx'
import Data from './components/Data.jsx';
import "./styles/root.css"

export default function App() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(true)
    const [feedback, setFeedback] = useState({})

    function propToSignUp() {
        setShowSignUp((oldState) => !oldState)
    }

    function propToLogin() {
        setShowLogin(oldstate => !oldstate)
    }

    function handleFeedback(data) {
        setFeedback(data)
    }


    return (
        <>
            <Navbar props={{propToLogin, propToSignUp, allowLogin: showLogin, userAccountName: feedback.userAccountName, handleFeedback}}/>
            {showLogin ? <Header functions={{propToSignUp}}/> : null}
            {showSignUp ? <SignUpForm functions={{propToSignUp, propToLogin, handleFeedback, feedback}} /> : null}
            {showLogin ? null : <Data />}
        </>
    )
}
