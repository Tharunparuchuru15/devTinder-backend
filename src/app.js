const express= require('express')

const app = express()
app.use("/",(req,res)=>{
    res.send("Hel from the serve")
})

app.use("/hello",(req,res)=>{
    res.send("Hello from the hello server")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the test server")
})

app.use("/test", (req, res)=>{
    res.send("hello from the practice")
})

app.listen(7000,()=>{
    console.log("Listening 00")
})


