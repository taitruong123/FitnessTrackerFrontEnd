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
