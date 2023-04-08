import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './header.js'
const App = () => {
    //state goes here
    const [routines, setRoutines] = useState ([])
    useEffect(()=>{
        //console.log("DATA HERE", data)
        const getRoutines = async() => {
            const response = await fetch(`/api/routines`)
            const data = await response.json()
            setRoutines(data.data.routines);
        }
        getRoutines()
    },[])


    
return (
    <div>
      <Header 
        // isLoggedIn={isLoggedIn}
        // setIsLoggedIn={setIsLoggedIn} 
        // setToken={setToken} 
        // setUsernameInput={setUsernameInput} 
        // setPasswordInput={setPasswordInput} 
        // setDisplayLogInButton={setDisplayLogInButton}
        /> 
    </div>)
}





const container = document.getElementById('app')
const root = createRoot(container);
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
)