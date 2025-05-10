const express = require("express")
const app = express()

const requestRouter = express.Router()

const {userAuth} = require("../middlewares/auth")

const ConnectionRequest = require("../models/connectionRequests")
const User = require("../models/user")
app.use(express.json())


requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req, res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status


        const allowedStatus = ["ignored", "interested", ]
        if(!allowedStatus.includes(status)){
          return res.status(400).json({
            message:"Invalid status"
          })
        }

        const toUser = await User.findById(toUserId)

        if(!toUser){
          throw new Error("User not found")
        }



        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
          
        })

        if(existingConnectionRequest){
          throw new Error("Connection request already exists")

        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
            
        })

        const data = await connectionRequest.save()

        res.json({
            message:req.user.firstName + "is" +status + "in"+ toUser.firstName,
            data
        })

  }catch(e){
        res.status(400).send(e.message)
    }
})


requestRouter.post("/request/review/:status/:requestId",userAuth, async (req, res)=>{
        
try { 
    const loggedInUser = req.user
    const status = req.params.status
    const requestId = req.params.requestId

    const allowedStatus = ["accepted", "rejected"]

    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            message:"Invalid status"
        })
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    })

    if(!connectionRequest){
        return res.status(400).json({
            message:"Connection request not found"
    })

    connectionRequest.status = status
    const data = await connectionRequest.save()
    res.json({
        message:"Connection request updated",
    })

    
}

}
catch (e) {
    res.status(400).send(e.message)
}
}) 

module.exports = {requestRouter} 