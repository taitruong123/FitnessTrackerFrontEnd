const express = require('express');
const { getAllActivities, createActivity, updateActivity, getPublicRoutinesByActivity} = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async(req, res, next) => {
    const id = parseInt(req.params.activityId);
    let exists = false;
    try{
        const activities = await getAllActivities();
        for(let i = 0; i < activities.length; i++){
            if(activities[i].id === id){
                exists = true;
            }
        }
        if(exists === true){
            const result = await getPublicRoutinesByActivity({id: id});
            res.send(result);
        }else{
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
        const activities = await getAllActivities();
        activities.map((activity, index)=>{
            if(activity.name === req.body.name){
                res.status(401).send({
                    error: "BROKEN",
                    name: "NameAlreadyExists",
                    message: `An activity with name ${req.body.name} already exists`
                });
            }
        })          
        const result = await createActivity(req.body);
        res.send(result);
        
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
        const activities = await getAllActivities();
        activities.map((activity, index)=>{
            if(activity.name === req.body.name){
                res.status(401).send({
                    error: "BROKEN",
                    name: "NameAlreadyExists",
                    message: `An activity with name ${req.body.name} already exists`
                });
            }
        })  
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
