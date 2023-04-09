import React, { useState } from 'react' 
import {Link, useNavigate}  from "react-router-dom"

const LogIn = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const logUserIn = async () => {
        try{
            const response = await fetch('api/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const result = await response.json();
            console.log(result, 'result from frontend')
            if(result.error){
                throw result.error;
            } else 
            {
            props.setId(result.user.id)
            props.setToken(result.token)
            props.setIsLoggedIn(true)
            navigate("/")};
            } catch(err){
                
                console.error(err)
        }
    }

    const registerUser = async () =>{
        try{
            const response = await fetch('api/users/register', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            });
            console.log(response)
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div id="logIn">
            <h2>Log In</h2>
            <form className="Form">
                <label>
                    Username:
                    <input type="text"
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        id="username"
                        >
                    </input>
                </label>

                <label>
                    Password:
                    <input 
                    type="text"
                    placeholder="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password">
                    </input>
                </label> 
                <button className="logInbutton"
                 onClick={logUserIn}>Log In</button>
                <button className="registerButton" 
                 onClick={registerUser}>Register New User</button>



            </form>



            
        </div>
    )





}








export default LogIn;