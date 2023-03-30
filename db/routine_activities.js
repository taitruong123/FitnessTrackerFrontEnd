const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration
}) {
    try {
  const { rows } = await client.query(`
      
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    RETURNING *;

  `,[routineId, activityId, count, duration]);
  return rows;
} catch(err){
    console.error(err)
  }
}

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {

try{ 

    const { rows } = await client.query(`
    
    SELECT * FROM routine_activities
    WHERE "routineId"=${id};
    
    `) 
    return rows;
} catch(err){
  console.error(err)
}

}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
