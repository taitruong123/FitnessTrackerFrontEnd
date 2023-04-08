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
            const response = await fetch(`/api/routines`)
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
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn} setUserToken={setUserToken} />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/register' element={<Register setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn}/>}></Route>
            </Routes>
    </div>)
}





const container = document.getElementById('app')
const root = createRoot(container);
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
)