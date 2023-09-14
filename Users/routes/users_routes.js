const express = require("express")
const { findOne } = require("../models/users")
const Users = require("../models/users")
const config = require('../../config')
const middleware = require("../../middleware")
const jwt = require('jsonwebtoken')
const { statusCode } = require('../../constants')
const router = express.Router()





router.route("/auth").post((req,res)=>{
    Users.findOne({email:req.body.email},(err,result)=>{
        if(err) {return res.json({status:4,message:err})}
        if(result===null)
        {
            const user = new Users({   
                email:req.body.email,
            })
            user
             .save()
             .then(()=>{
            let token = jwt.sign({email:req.body.email},config.key,{expiresIn:"24h"})
            Users.findOne({email:req.body.email},(err,result)=>{
                if(err) {return res.json({status:4,message:err})}
                else if(result!==null){
                    return res.status(200).json({
                        status:statusCode.STATUS_SUCCESS,
                        message:"Successfully Signed Up",
                        token:token,
                        data:result
                    })
                }
            })
           
               })
             .catch((err)=>{
                {return res.json({status:statusCode.STATUS_ERROR,message:err})}
               })
        }  
        else
        {
            let token = jwt.sign({email:req.body.email},config.key,{expiresIn:"24h"})
            res.status(200).json({
                status:statusCode.STATUS_SUCCESS,
                message:"Successfully Logged in",
                token:token,
                data:result
            })
        }
   })
})



module.exports = router