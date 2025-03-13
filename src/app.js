const express= require('express')

const app = express()

app.use("/test",(req,res)=>{
    res.send("Hello from the test serverr")
})

app.get("/user", (req, res)=>{
    res.send("user sent")
    
})

app.post("/user", (req,res)=>{
    res.send("user created")
})
app.delete("/user", (req,res)=>{
    res.send("user deleted")
})




app.listen(7000,()=>{
    console.log("Listening 00")
})


