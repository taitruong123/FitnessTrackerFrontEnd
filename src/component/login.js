import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const logIn = async (event) =>{
//endpoint ternary goes here

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ invalidLogin, setInvalidLogin] = useState('false');
    const navigate = useNavigate();

    const login = async () => {
        try {
          const response = await fetch('api/users/login', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'username',
                password: 'password'
            })
          });
        } catch (err) {
          console.error(err);
        }
    }

}

export default logIn