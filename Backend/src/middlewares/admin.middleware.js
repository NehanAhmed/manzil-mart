const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authAdminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const checkIfUserExistsAndIsAdmin = await userModel.findOne({
            _id: decoded.id,
            role: "admin"
        })
        if (!checkIfUserExistsAndIsAdmin) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please login again" })
        }
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = {
    authAdminMiddleware
}