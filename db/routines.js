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

    try{ const { rows } = await client.query(`
    
    SELECT * FROM routines
    WHERE id=${id};
    
    `); 
    return rows[0];
    } catch(err){
      console.error(err)
    } 

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
  //console.log('USER ID IS UNDEFINED WITH A STEEL CHAIR', user.id);
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
async function destroyRoutine(id) {

    try{ 

      await client.query(`
    
      DELETE FROM routine_activities
      WHERE "routineId"=${id};
  
      `);

      await client.query(`
    
      DELETE FROM routines
      WHERE id=${id};

      `);
 
  } catch(err){
      console.error(err)}
}

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


