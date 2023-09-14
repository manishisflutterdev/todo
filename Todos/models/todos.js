const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Todo = Schema({
   userId:{
       type:String,
   },
   todo:{
    type:String
   },
   date:{
    type:String
   }
})

module.exports = mongoose.model("Todos", Todo)
