
const express = require('express')
const app = express()
const connectDB = require('./config/database')
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

const {authRouter} = require('./routes/auth')
const {profileRouter} = require('./routes/profile')
const {requestRouter} = require('./routes/requests')
const userRouter = require('./routes/user')


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

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







