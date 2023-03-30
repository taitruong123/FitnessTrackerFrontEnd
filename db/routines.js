const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities")
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

async function getRoutineById(id) {}

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
      JOIN users
      ON routines."creatorId"=users.id;
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
      ON routines."creatorId"=users.id AND routines."isPublic"=true;
    `);
    return await attachActivitiesToRoutines(rows);
  }catch(err){
    console.error(err);
  }
}

async function getAllRoutinesByUser({ username }) {
  try{
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    INNER JOIN users
    ON routines."creatorId"=users.id AND (users.username="${username}");
  `);
  return await attachActivitiesToRoutines(rows);
  }catch(err){
    console.error(err);
  }
}

async function getPublicRoutinesByUser({ username }) {

}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

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
