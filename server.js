const { Router } = require("express")
const express = require("express")
const PORT = process.env.PORT || 5000
const app = require('express')()
const cors = require("cors");
const config = require("./config")
const mongo_connect = require("./functions/mongo_function")
const routesArray = require("./routes_list")
const server = require('http').createServer(app)
const mongo = () => mongo_connect()     // MongoDB Connection


app.use(cors());
app.use(express.json())
app.route("/").get((req,res)=>{
    res.json("Ekaggata Server")
})
server.listen(PORT,"0.0.0.0",()=>{
    console.log("Server Started",PORT)
})


routesArray.forEach((item,index)=>{
    let routeVariable = require(routesArray[index].routeDirectory)
    app.use(routesArray[index].route,routeVariable)
})





