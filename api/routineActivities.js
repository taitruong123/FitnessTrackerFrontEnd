const express = require('express');
const { getRoutineActivityById, getRoutineById, updateRoutineActivity, getUserByUsername, destroyRoutineActivity } = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', async (req, res, next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const routineActivityId = req.params.routineActivityId;
    data = req.body;
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
            const routineActivity = await getRoutineActivityById(routineActivityId);
            //console.log("ROUTINE ACTIVITY ", routineActivity);
            const routine = await getRoutineById(routineActivity.routineId);
            if(user.id === routine.creatorId){
                data["id"] = routineActivityId;
                const result = await updateRoutineActivity(data);
                res.send(result);
            }else{
                res.status(403).send({
                    error: "BROKEN",
                    name: "UnauthorizedUser",
                    message: `User ${user.username} is not allowed to update ${routine.name}`
                })
            }
        }
    }catch(err){
        next(err);
    }
})

// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const routineActivityId = req.params.routineActivityId;
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
            const routineActivity = await getRoutineActivityById(routineActivityId);
            const routine = await getRoutineById(routineActivity.routineId);
            if(user.id === routine.creatorId){
                const result = await destroyRoutineActivity(routineActivityId);
                res.send(result);
            }else{
                res.status(403).send({
                    error: "BROKEN",
                    name: "UnauthorizedUser",
                    message: `User ${user.username} is not allowed to delete ${routine.name}`
                })
            }
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;
