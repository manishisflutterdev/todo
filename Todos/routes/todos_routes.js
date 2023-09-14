const express = require("express")
const { findOne } = require("../models/todos")
const Todos = require("../models/todos")
const config = require('../../config')
const middleware = require("../../middleware")
const jwt = require('jsonwebtoken')
const { statusCode } = require('../../constants')
const router = express.Router()





router.route("/getAllTodos/:userId").get(middleware.checkToken,(req,res)=>{
    Todos.find({userId:req.params.userId},(err,result)=>{
        if(err) {return res.json({status:4,message:err})}
        else {
            return res.status(200).json({
                status:statusCode.STATUS_SUCCESS,
                data:result
            })
        }
    })
})



router.route("/getTodosByDate/:userId/:date").get(middleware.checkToken,(req,res)=>{
    Todos.find({userId:req.params.userId,date:req.params.date},(err,result)=>{
        if(err) {return res.json({status:4,message:err})}
        else {
            return res.status(200).json({
                status:statusCode.STATUS_SUCCESS,
                data:result
            })
        }
    })
})



router.route("/save").post(middleware.checkToken,(req,res)=>{
    const todo = new Todos({   
        userId:req.body.userId,
        todo:req.body.todo,
        date:req.body.date
    })
    todo
     .save()
     .then(()=>{
        res.json({status:statusCode.STATUS_SUCCESS,message:"Successfully Added your Todo",})
       })
     .catch((err)=>{
        {return res.json({status:statusCode.STATUS_ERROR,message:err})}
       })
})



router.route("/delete/:_id").delete(middleware.checkToken,(req,res)=>{
    Todos.findOneAndDelete({ _id: req.params._id},(err,result) => {
            if(err) {return res.json({status:statusCode.STATUS_ERROR,message:err})}
            return res.json({status:statusCode.STATUS_SUCCESS,message:"success"})
        }
    )
})



module.exports = router