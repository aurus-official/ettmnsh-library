import React, { useState } from 'react';
import Navbar from './components/Nav.jsx'
import Header from './components/Header.jsx';
import SignUpForm from './components/SignUpForm.jsx'

export default function App() {
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    function toggleShowSignUpForm() {
        setShowSignUpForm((oldState) => !oldState)
    }

    console.log(showSignUpForm)

    return (
        <>
            <Navbar/>
            <Header showToggle={toggleShowSignUpForm}/>
            {showSignUpForm ? <SignUpForm showToggle={toggleShowSignUpForm} /> : null}
        </>
    )
}
