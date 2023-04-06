const express = require('express');
const { getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity } = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async(req, res, next) => {
    const id = req.params.activityId;
    try{
        const result = await getPublicRoutinesByActivity({id: id});
        if(result != null){
            res.send(result);
        }else{
            console.log("RESULT HERE INSIDE: ", result);
            res.status(401).send({
                error: "BROKEN",
                name: "ActivityDoesNotExist",
                message: `Activity ${id} not found`
            })
        }
    }catch(err){
        next(err);
    }
})

// GET /api/activities
router.get('/', async (req, res, next) => {
    try{
        const activties = await getAllActivities();
        res.send(activties);
    }catch(err){
        next(err);
    }
})

// POST /api/activities
router.post('/', async (req, res, next) => {
    try{
        let nameCheck = true;
        const activities = await getAllActivities();
        nameCheck = activities.map((activity, index)=>{
            if(activity.name === req.body.name){
                return false;
            }
        })
        if(nameCheck === false){
            res.status(401).send({
                error: "BROKEN",
                name: "NameAlreadyExists",
                message: `This activity name already exists`
            });
        }else{
            const result = await createActivity(req.body);
            res.send(result);
        }
    }catch(err){
        next(err)
    }
})  

// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res, next) => {
    const id = req.params.activityId
    const data = req.body;
    data.id = id;
    try{
        const activity = await updateActivity(data);
        if(!activity){
            res.status(401).send({
                error: "BROKEN",
                name: "ActivityDoesNotExist",
                message: `Activity ${id} not found`
            })
        }else{
            res.send(activity);
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;
