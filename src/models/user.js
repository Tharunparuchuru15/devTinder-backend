const mongoose = require('mongoose')



const userSchema =new  mongoose.Schema ({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true

    },
    emailId:{
        type:String,
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
})


module.exports= mongoose.model("User", userSchema)



