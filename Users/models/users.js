const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Users = Schema({

  
   email:{
       type:String,
   },

 
})

module.exports = mongoose.model("Users", Users)
