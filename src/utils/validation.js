
const validator = require("validator")
const validateSignUpData= (req)=>{

    const {firstName, lastName, emailId, password}= req.body

    if(!firstName || !lastName || !emailId || !password){
       throw new Error("Fields are required")
    }
   else if(!validator.isEmail(emailId)){
    throw new Error("Invalid email")
   } else if(!validator.isStrongPassword(password)){
       throw new Error("Password is not strong enough")
   }
}

const validateEditProfileData=(req)=>{
    const allowedEditableFields = ["firstName", "lastName", "emailId", "city", "age", "gender", "about", "skills"]

    const isEditAllowed= Object.keys(req.body).every((key)=>{
        if(!allowedEditableFields.includes(key)){
            throw new Error("Invalid field")
            }
    })


}

module.exports = {validateSignUpData,validateEditProfileData}