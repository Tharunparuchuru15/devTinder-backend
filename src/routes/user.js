const express= require('express')
const { userAuth } = require('../middlewares/auth')

const userRouter = express.Router()
const ConnectionRequest = require('../models/connectionRequests')
const User = require('../models/user')


userRouter.get("/user/requests/received", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
          toUserId:loggedInUser._id,
          status:"interested"
        }).populate("fromUserId",["firstName", "lastName"])

        res.json({
            message:"Data fetched successfully",
            data:connectionRequests

        })

    }
    catch(e){
        res.status(400).send(e.message)
    }
})

userRouter.get("/user/connections", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"},
            ]

        }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"])

       const data = connectionRequests.map((row)=>{
        if(row.fromUserId.toString() === loggedInUser._id.toString()){
        return row.toUserId
        }
        return row.fromUserid
    })

    res.json({
        message:"Connnection requests fetched successfully",
        data
    })


    }catch(e){
        res.status(400).send(e.message)
    }
    
})


userRouter.get("/feed", userAuth, async(req, res)=>{
    try {
        const loggedInUser = req.user

        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit)|| 10


        limit = limit > 100 ? 100 : limit
        const skip = (page-1)*limit

        const connectionRequests = await ConnectionRequest.find({

            $or:[
                {fromUserId:loggedInUser._id, },
                {toUserId:loggedInUser._id, }
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed= new Set()

        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and:[{
                _id:{$nin: Array.from(hideUsersFromFeed)}
            },
            {
                _id:{$ne: loggedInUser._id}
            }]
        
        }).select("firstName lastName").skip(skip).limit(limit)

        res.json({
            message:"Feed fetched successfully",
            data:users
        })
         
    } catch (e) {
        res.status(400).send(e.message)
    }
})
module.exports = userRouter