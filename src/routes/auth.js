const express = require("express")

const authRouter = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const {validateSignUpData} = require("../utils/validation")




authRouter.post("/signup", async (req, res)=>{
    try{
        //validation of data
        validateSignUpData(req)
        const password= req.body.password
        const {firstName, lastName, emailId,}= req.body
        // const salt = await bcrypt.genSalt(10)
        const passwordHash= await bcrypt.hash(password, 10)
       // creating a new instance of the user model
        const user = new User({
            firstName,
            lastName, 
            emailId,
            password:passwordHash
            })
        await user.save()
        res.send("user added successfully")}
        catch(e){
        res.status(400).send(e.message) 
    }
 
})


authRouter.post("/login", async(req, res)=>{
    try{
        const {emailId, password}= req.body
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("User not found")
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            //create a jwt token
            const token = await user.getJWT()
            //add the token to the cookie and send the response back to the user.
            res.cookie("token", token,{
                expires:new Date(Date.now() + 24*60*60*1000)
            } )
            res.send(user)
        }else{
            throw new Error("Invalid password")
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

authRouter.post("/logout", async(req, res)=>{
    try{
        res.cookie(
            "token",null, {
                expires: new Date(Date.now()),
            }
        ).send("Logout successful")
    }catch(e){
        res.status(400).send(e.message)

    }
})


module.exports = {authRouter}