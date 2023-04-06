const client = require("./client");
const { getUserById } = require("./users")
const { getRoutineById } = require("./routines")

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
  return rows[0];
} catch(err){
    throw err
  }
}

async function getRoutineActivityById(id) {

  try{const { rows } = await client.query(`
  
    SELECT * FROM routine_activities
    WHERE id=${id}; 
  
  `);
return rows[0]
} catch(err){
  console.error(err)
}


}

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

async function updateRoutineActivity({ id, ...fields }) {


  const setString = Object.keys(fields).map(
    (key,index) =>`"${key}"=$${index+1}`
  ).join(', ');
try {
  const { rows } = await client.query(`

    UPDATE routine_activities
    SET ${setString}
    WHERE id=${id}
    RETURNING *;

  `, Object.values(fields))
return rows[0]
} catch(err){console.error(err)}

}

async function destroyRoutineActivity(id) {

  try{ 

    const { rows } = await client.query(`
      DELETE FROM routine_activities
      WHERE id=${id}
      RETURNING *;
    `);
return rows[0]
} catch(err){
    console.error(err)
  }

}

async function canEditRoutineActivity(routineActivityId, userId) {

    const routineActivity = await getRoutineActivityById(routineActivityId) 
    const routine = await getRoutineById(routineActivity.routineId)
      if ( userId === routine.creatorId) 
      return (true)
      else return(false);

    }



module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
