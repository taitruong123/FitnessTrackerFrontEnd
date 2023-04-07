/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser } = require("../db")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getAllUsernames, getUserByUsername } = require('../db/users');
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require('../db/routines');
const { token } = require("morgan");


// POST /api/users/register
dotenv.config()
const generateToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET);
}


router.post('/register', async ( req, res, next) => {
    const {password} = req.body;
    try{
        if(typeof password === "string" && password.length < 8){
            res.send({
                error: "BROKEN",
                name: "PasswordTooShortError",
                message: `Password Too Short!`
            })
        }
        const usernames = await getAllUsernames();
        usernames.map((user, index) => {
            if(user.username === req.body.username){
                res.status(401).send({
                    error: "BROKEN",
                    name: "UserAlreadyExists",
                    message: `User ${req.body.username} is already taken.`
                });
            }
        })
        const response = await createUser(req.body)
        const jsonToken = generateToken(response.username);
        const loginMessage = "Congratulations you logged in!";
        res.send({  
            message: loginMessage,
            token: jsonToken,
            user: response
    })
    } catch(err) {
        next(err);
    }
}
)

// POST /api/users/login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }
    try{
        const user = await getUserByUsername(username);
        const token = jwt.sign(user, process.env.JWT_SECRET);

        if(user && user.password === password){
            res.send({
                user: user,
                message: "you're logged in!",
                token: token
            });
        }
    }catch(err){
        next(err);
    }
})

// GET /api/users/me
router.get('/me', async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){    
    res.status(401).send({
        error: "BROKEN",
        name: "MissingTokenError",
        message: "You must be logged in to perform this action"
    })
   }else{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.send(decodedToken)
   }
})

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res, next)=>{
    const username = req.params.username
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    try{
        const user = getUserByUsername(username);
        const publicRoutines = await getPublicRoutinesByUser({username: username});
        const allRoutines = await getAllRoutinesByUser({username: username});
        if(decodedToken.username === username){
            res.send(allRoutines)
        }else{
            res.send(publicRoutines);
        }

    }catch(err){
        next(err);
    }
})

module.exports = router;
