const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next()
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: "AthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`
        });
    }
})

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.send({
        message: "The route is healthy"
    })
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
const { getUserById } = require('../db');

router.use('/routine_activities', routineActivitiesRouter);

router.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

router.get('*', (req,res,next) => {
    res.status(404).send({
        error: "BROKEN",
        name: "RouteDoesNotExistError",
        message: "Sorry, the page you're looking for isn't here"
    })
})
module.exports = router;
