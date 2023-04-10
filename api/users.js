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
// const generateToken = (username) => {
//     return jwt.sign(username, process.env.JWT_SECRET);
// }


router.post('/register', async ( req, res, next) => {
<<<<<<< HEAD
    try{
        const usernames = await getAllUsernames();
        usernames.map((user, index) => {
            if(user.username === req.body.username){
                res.status(401).send({
                    error: "BROKEN",
                    name: "UserAlreadyExists",
                    message: `User ${req.body.username} is already taken`
                });
            }
        })
        const response = await createUser(req.body)
        const jsonToken = generateToken(response.username);
        const loginMessage = "Congratulate You Login";
        // console.log('TOKEN HERE!!!!', token);
        res.send({  
            message: loginMessage,
            token: jsonToken,
            user: response
=======
    const {username, password} = req.body.user;
        try{
            const existingUsername = await getUserByUsername(username);
            console.log(existingUsername, 'existing user')
            if(existingUsername){
                res.send({
                    error: "BROKEN",
                    name: "UserAlreadyExists",
                    message: `User ${username} is already taken.`
                });
            } else if(password.length < 8){
                res.send({
                    error: "BROKEN",
                    name: "PasswordTooShortError",
                    message: `Password Too Short!`
                })
            }else{
                const newUser = await createUser({username, password})
                console.log('newuser', newUser)
                const jsonToken = jwt.sign({
                    id: newUser.id,
                    username
                },
                process.env.JWT_SECRET
                );
                res.send({  
                    message: "Congratulations you logged in!",
                    token: jsonToken,
                    user: newUser
>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc
    })
}
    } catch(err) {
        console.log("error: " , err)
        next(err);
    }
})

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

    try{
        const user = await getUserByUsername(username)
        if(req.user && req.user.username === user.username){
            const allRoutines = await getAllRoutinesByUser(req.user)
            res.send(allRoutines)
        } else {
            const getAllPublicRoutines = await getPublicRoutinesByUser(user)
            res.send(getAllPublicRoutines)
        }

    }catch(err){
        next(err);
    }
})

module.exports = router;