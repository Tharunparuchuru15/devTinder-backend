const { JsonWebTokenError } = require('jsonwebtoken')
const mongoose = require('mongoose')

const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const userSchema =new  mongoose.Schema ({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        index:true

    },
    lastName:{
        type:String,
        required:true,
        minLength:3

    },
    emailId:{
        type:String,
        required:true,
         unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female", "others"].includes(value)){
                throw new Error("Invalid gender")
            }
         

        }
    },
    about:{
        type:String,
        default:"This is the default about section"
    },
    skills:{
        type:[String]
    },
},
{
    timestamps:true
},
)

 
 
userSchema.methods.getJWT=async function (){
    //dont use arrrow functio as this wont work as we need
    const user = this
    const token = await jwt.sign({_id:user._id}, 'devtinder@tharun',{
        expiresIn:"1d"
    })
    return token
}

userSchema.methods.validatePassword = async function(inputPassword){
    const user = this
    const passwordHash = user.password

    const isValidatePassword = await bcrypt.compare(inputPassword, passwordHash)
    return isValidatePassword
}


module.exports= mongoose.model("User", userSchema)



