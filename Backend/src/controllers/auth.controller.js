const userModel = require("../models/user.model")
const vendorModel = require("../models/vendor.model")

const bcrypt = require("bcryptjs")
const multer = require('multer')
const { uploadFile } = require('../services/storage.service')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const file = req.file;

        const checkIfUserExists = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (checkIfUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        if (!file) {
            const user = await userModel.create({ username, email, password: hashedPassword, bio, profilePicture: "" });
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user
            });
            return;
        }
        const profilePicture = await uploadFile(file.buffer.toString('base64'));

        const user = await userModel.create({ username, email, password: hashedPassword, bio, profilePicture: profilePicture.url });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token =jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })


res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
})
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const applyAsVendor = async (req, res) => {
    try {
        const { storeName, storeDescription, phoneNumber } = req.body;
        const token = req.user
        const ifUserExists = await userModel.findOne({
            _id: token.id
        })
        if (!ifUserExists) {
            return res.status(401).json({ message: "User not found" });
        }


        const vendor = await vendorModel.create({
            user: ifUserExists._id,
            storeName,
            storeDescription,
            phoneNumber
        })

        res.status(201).json({
            success: true,
            message: "Vendor applied successfully",
            vendor
        })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login,
    logout,
    applyAsVendor,
    upload

}

