require("dotenv").config()
const cors = require('cors')
const express = require("express")
const apiRouter = require("./api")
const app = express();
 const client  = require("./db/client")
 const cohortName = '2211-ftb-et-web-am'
 const baseUrl = `https://fitnesstrac-kr.herokuapp.com/${cohortName}`
// Setup your Middleware and API Router here


client.connect()
app.use(cors())
app.use(express.json())

app.get("/", (req, res, next)=>{
    res.send("Hello World")
})


app.use('/api', apiRouter)
module.exports = { app,  baseUrl} 