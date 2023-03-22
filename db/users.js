const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const{ rows } = await client.query(`

    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);
  return rows;
  } catch(err){
    console.error(err)
  }
}

async function getUser({ username, password }) {

}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
