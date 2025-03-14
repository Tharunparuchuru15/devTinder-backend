const adminAuth= (req, res,next)=>{
    console.log("Checking")
    const token = "abcd"
    const isAdmin= token==="abcd"
    if(!isAdmin){
        res.status(401).send("fka")
    }else{
        next()
    }
}



const userAuth= (req, res,next)=>{
    console.log("Checking")
    const token = "abcd"
    const isAdmin= token==="abcd"
    if(!isAdmin){
        res.status(401).send("user bye ")
    }else{
        next()
    }
}

module.exports={adminAuth, userAuth}