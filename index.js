const PORT = 5000|| process.env.PORT
const express = require ("express")
const connection= require("./connection")
const Recipe= require("./recipe")
const app = express()
const path = require("path")

require("dotenv").config()

connection()
app.use(express.static("public"))
app.use(express.json())


/*app.get('/', async(req,res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
}
)*/

app.listen(PORT)
console.log("Listening to the port "+ PORT)