const vendorModel = require("../models/vendor.model")
const userModel = require("../models/user.model")
const orderModel = require("../models/order.model")
const productModel = require("../models/product.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const createAdmin = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash("admin123", 10)
        const user = await userModel.create({
            username: "Admin",
            email: "admin@manzilmart.com",
            password: hashedPassword,
            role: "admin",
            bio: "I am the admin of Manzil Mart",
            profilePicture: "https://ik.imagekit.io/td7wr0ax7o/image_VkMH8H4nI.jpg?updatedAt=1777448506095"
        })
        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "User is not an admin"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Admin logged in successfully."
        })



    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })

    }
}


const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie("adminToken");
        res.status(200).json({
            message: "Admin logged out successfully."
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })

    }
}

const updateVendorStatus = async (req, res) => {
    try {
        const { vendorId, status } = req.body;
        const checkIfVendorExists = await vendorModel.findOne({ _id: vendorId, status: { $ne: 'deleted' } });
        if (!checkIfVendorExists) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            })
        }
        const vendor = await vendorModel.findByIdAndUpdate(vendorId, { status }, { new: true });

        const updateUserStatus = await userModel.findByIdAndUpdate(vendor.user, { role: 'vendor' }, { new: true });
        if (!updateUserStatus) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "Vendor status updated successfully.",
            vendor
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const fetchAllPendingVendors = async(req, res) => {
    try {
        const vendors = await vendorModel.find({ status: 'pending' });
        res.status(200).json({
            message: "Pending vendors fetched successfully.",
            vendors
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const fetchAllVendors = async(req, res) => {
    try {
        const vendors = await vendorModel.find({ status: { $ne: 'deleted' } });
        res.status(200).json({
            message: "Vendors fetched successfully.",
            vendors
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const fetchAllProducts = async(req, res) => {
    try {
        const {page=1,limit=10} = req.query;
        const products = await productModel.find({ status: { $ne: 'deleted' } }).limit(limit).skip((page-1)*limit);
        res.status(200).json({
            message: "Products fetched successfully.",
            products
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const fetchAllOrders = async(req,res) => {
    try {
        const {page=1,limit=10} = req.query;
        const orders = await orderModel.find().limit(limit).skip((page-1)*limit);
        res.status(200).json({
            message: "Orders fetched successfully.",
            orders
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    logoutAdmin,
    updateVendorStatus,
    fetchAllPendingVendors,
    fetchAllVendors,
    fetchAllProducts,
    fetchAllOrders
}