 const mongoose = require("mongoose")

 const connectDB= async ()=>{
   await mongoose.connect("mongodb+srv://tharundevTinder:kZvw3ci7qknyjUg2@cluster-devtinder.7jyvcmg.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster-devTinder/"
 )}

 module.exports = connectDB

