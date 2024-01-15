const user = require("../Models/user")
const jwt = require("jsonwebtoken")


exports.isAuthenticated= async(req,res,next)=>{

try {
    const {token}=req.cookies;
if(!token){
    return res.status(401).json({
        mesaage:"please Login First"
    })
}

const  decodes = await jwt.verify(token, process.env.JWT_SECRET);

req.user = await user.findById(decodes._id);
next();
} catch (error) {
    res.status(500).json({
        message:error.msg
    })
}
};