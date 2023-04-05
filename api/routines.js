const express = require('express');
const router = express.Router();
const { getAllPublicRoutines, createRoutine } = require('../db/routines');
const { getUserByUsername } = require('../db/users')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// GET /api/routines
router.get('/', async (req, res, next) => {
    try{
        const routines = await getAllPublicRoutines();
        res.send(routines);
    }catch(err){
        next(err)
    }
})

// POST /api/routines
router.post('/', async (req, res, next) => {
    const {name, goal, isPublic} = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try{
        if(!token){
            res.status(401).send({
                error: "BROKEN",
                name: "MissingTokenError",
                message: "You must be logged in to perform this action"
            })
        }else{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await getUserByUsername(decodedToken.username);
            await createRoutine({
                name: name,
                goal: goal,
                isPublic: isPublic,
                creatorId: user.id
            });
        }
        
    }catch(err){
        next(err);
    }
})

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
