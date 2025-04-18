
const express = require('express')
const app = express()

const connectDB = require('./config/database')
const User = require("./models/user")




app.use(express.json())

app.post("/signup", async (req, res)=>{
    // creating a new instance of the user model
    const user = new User(req.body)
    try{
    await user.save()
    res.send("user added successfully")}
    catch(e){
    res.status(400).send(e.message)
    }
 
})

app.get("/user", async (req, res)=>{
    const userEmail = req.body.emailId
    try{
       const users = await  User.findOne({emailId:userEmail})
       if(users.length===0 || !users){
         res.status(404).send("User not found")
       }
       else{
        res.send(users)
       }
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

app.get("/feed",async (req, res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(400).send(e.message)

    }

})

app.delete("/user", async (req, res)=>{
    const userId= req.body.userId
    try{
        const user =await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    }catch(e){
        res.status(400).send(e.message)

    }

})

app.patch("/user", async(req, res)=>{
     const userId = req.body.userId
     const data = req.body
     console.log(data)
     try{
        //can pass just userId, inplace of object
        //also there is a third paramete called options, refer to document for more
        const user = await User.findByIdAndUpdate({_id:userId},data, {returnDocument:'before'})
        console.log(user)
        res.send("User updated successfully")

     }catch(e){
        res.status(400).send(e.message)
        
     }
})



connectDB()
.then(()=>{
console.log("Database connected")
app.listen(7000,()=>{
    console.log("Listening Server")
})
})
.catch(()=>{
console.error('Database connection failed')
})







