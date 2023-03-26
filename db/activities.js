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
    WHERE id = ${id};

  `);
  return rows[0]
} catch(err){
  console.error(err)
}

}

async function getActivityByName(name) {

  try {
    const { rows } = await client.query(`
    
      SELECT * FROM activities
      WHERE name = '${name}';
  
    `);
    return rows[0]
  } catch(err){
    console.error(err)
  }

}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}



// WE ARE HERE AND ITS BROKEN!!!!!!!!!!!!!!!!!!!!!!!!
async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity

console.log("FIELDS LOGGED HERE",fields)
try {
  const { rows } = await client.query(`
  
    UPDATE activities
    SET name = '${fields.name}', description = '${fields.description}'
    WHERE id = '${id}'
    RETURNING *;
  `);
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
