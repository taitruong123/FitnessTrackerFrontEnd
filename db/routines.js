const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities")
const { getUserByUsername } = require("./users")
async function createRoutine({ creatorId, isPublic, name, goal }) {

  try {

    const{ rows } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", "name", "goal")
      VALUES($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *; 
    `, [creatorId, isPublic, name, goal]);
    return rows[0];
  } catch (err) {
    console.error(err);
  }
}

async function getRoutineById(id) {



}

async function getRoutinesWithoutActivities() {
  try {

    const { rows } = await client.query(`
      SELECT * FROM routines;
    `)
    return rows
  } catch(err) {
    console.error(err)
  }

}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users ON routines."creatorId"=users.id;
    `);
     //console.log("ATTACH HERE", await attachActivitiesToRoutines(rows))
    return await attachActivitiesToRoutines(rows);
    //console.log("TEST HERE CHECK IT OUT", test.map(a => a.activities))
  } catch(err) {
    console.error(err)
  }
}

async function getAllPublicRoutines() {
  try{
    const { rows } = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users
      ON routines."creatorId"=users.id 
      WHERE routines."isPublic"=true;
    `);
    return await attachActivitiesToRoutines(rows);
  }catch(err){
    console.error(err);
  }
}

async function getAllRoutinesByUser({ username }) {
  try{
    const user = await getUserByUsername(username);
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users
    ON routines."creatorId"=users.id 
    WHERE "creatorId"=$1;
  `, [user.id]);
  console.log('USER ID IS UNDEFINED WITH A STEEL CHAIR', user.id);
  return await attachActivitiesToRoutines(rows);
  }catch(err){
    console.error(err);
  }
}

async function getPublicRoutinesByUser({ username }) {
    const user = await getUserByUsername(username)
    try { const { rows } = await client.query(`
    
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users
    ON routines."creatorId"=users.id 
    WHERE "creatorId"=$1 AND routines."isPublic"=true;
  `, [user.id]);
  return attachActivitiesToRoutines(rows);
    } catch(err){
      console.error(err)}

}

async function getPublicRoutinesByActivity({ id }) {

    try{ const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routine_activities."routineId" = routines.id
      WHERE routines."isPublic" = true
      AND routine_activities."activityId" = $1;
    `, [id]);
    return attachActivitiesToRoutines(rows)
} catch(err){
  console.error(err)}
 }


async function updateRoutine({ id, ...fields }) {

  const setString = Object.keys(fields).map(
    (key,index) =>`"${key}"=$${index+1}`
  ).join(', ');
try {
  const { rows } = await client.query(`

  UPDATE routines
  SET ${setString}
  WHERE id=${id}
  RETURNING *;

  `, Object.values(fields))
return rows[0]
} catch(err){console.error(err)}
}
async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};



async function attachActivitiesToRoutines(routines) {
  // no side effects
  const routinesToReturn = [...routines];
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];
  
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
      FROM activities 
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" IN (${ binds });
    `, routineIds);

    // loop over the routines
    for(const routine of routinesToReturn) {
      // filter the activities to only include those that have this routineId
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      // attach the activities to each single routine
      routine.activities = activitiesToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    throw error;
  }
}