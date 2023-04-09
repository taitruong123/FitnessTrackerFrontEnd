import React, { useState } from 'react' 
import {Link, useNavigate}  from "react-router-dom"





const LogIn = (props) => {
    const navigate = useNavigate();
    let [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        let name = event.target.name;
        console.log("VALUE HERE", value)

        setUserInfo((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const logUserIn = async (event) => {
        event.preventDefault();
        props.setUsername(userInfo.username);
        try{
            const response = await fetch('api/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userInfo.username,
                    password: userInfo.password
                }),
            });
            const result = await response.json();
            if(result.error){
                throw result.error;
            } else 
            {console.log('login result: ', result);
            console.log("user ID", result.user.id)
            props.setId(result.user.id)
            console.log("ID FOUND HERE", props.id)
            props.setToken(result.token)
            props.setIsLoggedIn(true)
            navigate("/")};
            } catch(err){
                
                console.error(err)
        }
    }

    const registerUser = async (event) =>{
        event.preventDefault();
        try{
            console.log("USER INFO HERE", userInfo.user)
            const response = await fetch('api/users/register', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    user: {
                        username: userInfo.username,
                        password: userInfo.password
                    }
                })
            });
            const result = await response.json();
            console.log(result)
            return result
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
                        onChange={handleChange}
                        name="username"
                        >
                    </input>
                </label>

                <label>
                    Password:
                    <input 
                    type="text"
                    placeholder="password"
                    onChange={handleChange}
                    name="password">

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