/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser } = require("../db")
// POST /api/users/register

router.post('/register', async ( req, res) => {
       // const { username, password } = req.body;

    try{
        const response = await createUser(req.body)
        console.log('RESPONSE HERE!!!!', response)
    } catch(err){console.error(err)}
}
)


// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
