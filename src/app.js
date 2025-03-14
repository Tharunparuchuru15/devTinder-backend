const express= require('express')

const app = express()

const {adminAuth, userAuth} = require("./utils/auth.js")

app.use("/admin",adminAuth)


app.use("/test",(req,res)=>{
    res.send("Hello from the test serverr")
})

app.get("/admin/getAllData",(req,res)=>{
        res.send("All data sent")
})

app.get("/user",(req, res)=>{
    console.log(req.params)
    res.send("user  3")
    
},
)



app.post("/user", (req,res)=>{
    res.send("user created")
})
app.delete("/user", (req,res)=>{
    res.send("user deleted")
})




app.listen(7000,()=>{
    console.log("Listening 00")
})


