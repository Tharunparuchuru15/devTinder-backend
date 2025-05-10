const jwt = require('jsonwebtoken')
const User = require('../models/user')


const userAuth=async (req, res, next)=>{

try{
const {token}= req.cookies

if(!token){
    return res.status(401).send("Please login")
}

const decodedObj = await jwt.verify(token, 'devtinder@tharun')
const {_id} = decodedObj

 const user = await User.findById(_id)
    // find the user

    if(!user){
        throw new Error("User not found")
    }
    req.user= user
    next()
}
catch(e){
    res.status(400).send(e.message)
}

}

module.exports ={userAuth}