<<<<<<< HEAD
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, Profiler } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './header.js'
const App = () => {
    //state goes here
    const [routines, setRoutines] = useState ([])
    const [ IsLoggedIn, setIsLoggedIn ] = useState(false);
    const [ userToken, setUserToken ] = useState('');

    useEffect(()=>{
        const getRoutines = async() => {
            const response = await axios.get(`/api/routines`)
            const data = await response.json()
            setRoutines(data.data.routines);
        }
        getRoutines()
    },[])


    
return (
    <div>
            <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} userToken={userToken} setUserToken={setUserToken}  />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
            </Routes>
    </div>)
=======
import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import axios from 'axios';
import Header from './header';
import Routines from './routines';
import { HashRouter, Routes, Route } from 'react-router-dom'
import LogIn from './logIn';
import Activities from './activties';
import MyRoutines from './myRoutines';

const App = () => {
const [ isLoggedIn, setIsLoggedIn ] = useState(false)
const [ routines, setRoutines ] = useState([])
const [ token, setToken ] = useState('')
const [ password, setPassword ] = useState('')
const [ count, setCount ] = useState('')
const [ duration, setDuration ] = useState('')
const [ activities, setActivities ] = useState([])
const [ username, setUsername ] = useState('')
const [ displayLogInButton, setDisplayLogInButton ] = useState(true)
const [ id, setId ] = useState(0)


useEffect(()=>{
    const displayAllPublicRoutines = async () => {
        try {
        const response = await fetch(`api/routines`, {
          headers: {
          'Content-Type': 'application/json',
          },
        });
        
        const result = await response.json();
        console.log(result);
         setRoutines(result)
        } catch (err) {
        console.error(err);
        }
        }; 
        
        const getActivities = async () => {
            try {
              const response = await fetch(`api/activities`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              const result = await response.json();
              
              console.log(result);
              setActivities(result)
            } catch (err) {
              console.error(err);
            }};

    getActivities()
    displayAllPublicRoutines()
},[]);

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                username={setUsername}
                password={setPassword}
                setDisplayLogInButton={setDisplayLogInButton}
            />
            <Routes>
                
            <Route path='/' element={ <div>
                <Routines
                    routines={routines}
                    token={token}
                    id={id}

                />
                </div>    
            }
             />
             <Route path='/login' element={
                <LogIn
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                token={token}
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                displayLogInButton={displayLogInButton}
                setDisplayLogInButton={setDisplayLogInButton}
                id={id}
                setId={setId}
                />

             }/>
            <Route path='/activities' element = {
                <Activities
                    activities={activities}
                    isLoggedIn={isLoggedIn}
                />
            }/>
            <Route path='/myroutines' element = {
                <MyRoutines
                username={username}
                token={token}
                />
            }/>
            </Routes>
            
        </>
    )
        
    
>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc
}





<<<<<<< HEAD
const container = document.getElementById('app')
const root = createRoot(container);
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
)
=======








const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(
<HashRouter>
    <App/>
</HashRouter>
    )
>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc
