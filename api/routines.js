const express = require('express');
const router = express.Router();
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine } = require('../db/routines');
const { getUserByUsername } = require('../db/users')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getActivityById, addActivityToRoutine, getRoutineActivitiesByRoutine } = require('../db');

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
            const result = await createRoutine({
                name: name,
                goal: goal,
                isPublic: isPublic,
                creatorId: user.id
            });
            res.send(result);
        }  
    }catch(err){
        next(err);
    }
})

// PATCH /api/routines/:routineId
router.patch('/:routineId', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const routineId = req.params.routineId;
    const data = req.body;
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
            const routine = await getRoutineById(routineId);
            if(user.id === routine.creatorId){
                data["id"] = routineId;
                const result = await updateRoutine(data);
                res.send(result);
            }else{
                res.status(403).send({
                    error: "BROKEN",
                    name: "UnauthorizedUserError",
                    message: `User ${user.username} is not allowed to update ${routine.name}`
                }) 
            }
        }
    }catch(err){
        next(err);
    }
})

// DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const routineId = req.params.routineId;
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
            const routine = await getRoutineById(routineId);
            if(user.id === routine.creatorId){
               const result = await destroyRoutine(routineId);
               res.send(result);
            }else{
                res.status(403).send({
                    error: "BROKEN",
                    name: "UnauthorizedUserError",
                    message: `User ${user.username} is not allowed to delete ${routine.name}`
                }) 
            }
        }
    }catch(err){
        next(err);
    }
})

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const {routineId, activityId} = req.body;
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
            const routine = await getRoutineById(routineId);
            if(user.id === routine.creatorId){
                const result = await addActivityToRoutine(req.body);
                res.send(result);
            }
        }
    }catch(err){
        res.status(401).send({
            error: "BROKEN",
            message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
            name: "ActivityAlreadyExistsInRoutineError"
        });
    }
})
module.exports = router;
