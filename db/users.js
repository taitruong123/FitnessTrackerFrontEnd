const client = require("./client");

// database functions
const getAllUsernames = async () => {
  try {
    const { rows } = await client.query(`
    
    SELECT username FROM users;

    `)
    return rows;
  } catch(err){
    console.error(err)
  }
}

// user functions
async function createUser({ username, password }) {
  try {
    const{ rows } = await client.query(`

    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);
  delete rows[0].password;
  return rows[0];
  } catch(err){
    console.error(err)
  }
}
//we are here
async function getUser({ username, password }) {
 try {
  const { rows } = await client.query(`

  SELECT * FROM users
  WHERE username = '${username}';

  `)
  if (password === rows[0].password)  {
    delete rows[0].password;
    return rows[0];
  }
 } catch (err){
  console.error(err)
  }
}

async function getUserById(userId) {
  try {
    const { rows } = await client.query(`
  
    SELECT * FROM users
    WHERE id = ${userId};
  
    `)
    delete rows[0].password;
    return rows[0];
  } catch(err) {
  console.error(err)
 }
}

async function getUserByUsername(userName) {
  try{ 
    const { rows } = await client.query(`
      SELECT * FROM users 
      WHERE username = '${userName}';
    `) 
    return rows[0];
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsernames
}
