require("dotenv").config()
const cors = require('cors')
const express = require("express")
const apiRouter = require("./api")
const app = express();
 const client  = require("./db/client")
<<<<<<< HEAD
 const cohortName = '2211-ftb-et-web-am'
 const baseUrl = `https://fitnesstrac-kr.herokuapp.com/${cohortName}`
// Setup your Middleware and API Router here

=======
 const path = require("path")

app.use("/dist", express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
>>>>>>> 3fd06be171bdc574686258adc558d2ceb3d95bdc

client.connect()
app.use(cors())
app.use(express.json())

app.get("/", (req, res, next)=>{
    res.send("Hello World")
})


app.use('/api', apiRouter)
module.exports = { app,  baseUrl} 