/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser } = require("../db")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getAllUsernames } = require('../db/users');


// POST /api/users/register
dotenv.config()
const generateToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET);
}


router.post('/register', async ( req, res, next) => {
    try{
        const usernames = await getAllUsernames();
        usernames.map((user, index) => {
            if(user.username === req.body.username){
                throw new Error('User Already Exist');
            }
        })

        console.log('USERNAME HERE!', usernames);
        const response = await createUser(req.body)
        const jsonToken = generateToken(response.username);
        const loginMessage = "Congratulate You Login";
        // console.log('TOKEN HERE!!!!', token);
        res.send({  
            message: loginMessage,
            token: jsonToken,
            user: response
    })
    } catch(err) {
        throw err;
    }
}
)

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
