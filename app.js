require("dotenv").config()
const cors = require('cors')
const express = require("express")
const apiRouter = require("./api")
const app = express();
 const client  = require("./db/client")
// Setup your Middleware and API Router here
client.connect()
app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
module.exports = app;
