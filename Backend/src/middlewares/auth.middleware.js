const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authVendorMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const checkIfUserExistsAndIsVendor = await userModel.findOne({
        _id: decoded.id,
        role:"vendor"
    })
    if(!checkIfUserExistsAndIsVendor){
        return res.status(401).json({ message: "User not found" });
    }
    req.user = decoded;
    next();
}

const authMiddleware = async(req,res,next) => {
   try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const checkIfUserExists = await userModel.findOne({
            _id: decoded.id
        })
        if (!checkIfUserExists) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = decoded; 
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please login again" })
        }
        return res.status(401).json({ message: "Invalid token" })
    }
}


module.exports = {
    authVendorMiddleware,
    authMiddleware
};