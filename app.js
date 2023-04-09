require("dotenv").config()
const cors = require('cors')
const express = require("express")
const apiRouter = require("./api")
const app = express();
 const client  = require("./db/client")
 const path = require("path")

app.use("/dist", express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

client.connect()
app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
module.exports = app;
