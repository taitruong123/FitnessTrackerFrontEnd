const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows } = await client.query(`

    INSERT INTO activities(name, description)
    VALUES($1, $2)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    
    `,[name, description]) 
    return rows[0];
  }
  catch (err){
    console.error(err)
  }
}

async function getAllActivities() {
  // select and return an array of all activities

  try {
     const {rows} = await client.query(`

     SELECT * FROM activities;

     `); 
     return rows; 

  } catch(err) {
    console.error(err)
  }
}

async function getActivityById(id) {

try {
  const { rows } = await client.query(`
  
    SELECT * FROM activities
    WHERE id = $1;

  `, [id]);
  return rows[0]
} catch(err){
  console.error(err)
}

}

async function getActivityByName(name) {

  try {
    const { rows } = await client.query(`
    
      SELECT * FROM activities
      WHERE name = $1;
  
    `,[name] );
    return rows[0]
  } catch(err){
    console.error(err)
  }

}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
const rountineIdArray = [...routines]
    const binds = routines.map((id, index)=> {
      return `$${index+1}`
    }).join(', ');
    const routineIds = routines.map((routine)=>{
      return routine.id}
    );
    if (!routineIds?.length) return[];
    try{ const { rows } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId" 
      FROM activities 
      JOIN routine_activities
      ON routine_activities."activityId"=activities.id
      WHERE routine_activities."routineId" IN (${binds});
      `, routineIds);
    // console.log("SO MANY ROWS",rows)
    for (const element of rountineIdArray){
      const filterActivity = rows.filter(activity => {return activity.routineId === element.id})
      element.activities = filterActivity
    }
  return rountineIdArray;
  } catch(err){
      console.error(err)}

}

async function updateActivity({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key,index) =>`"${key}"=$${index+1}`
  ).join(', ');
try {
  const { rows } = await client.query(`
  
    UPDATE activities
    SET ${ setString }
    WHERE id=${ id }
    RETURNING *;
  `, Object.values(fields));
  return rows[0];
} catch(err) {
  console.error(err)
}

}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
