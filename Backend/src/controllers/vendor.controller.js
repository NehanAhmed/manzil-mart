

const productModel = require('../models/product.model')
const vendorModel = require("../models/vendor.model")
const orderModel = require("../models/order.model")
const jwt = require('jsonwebtoken')



const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const orderId = req.params.id
        const token = req.cookies.token
        const decoded = jwt.decode(token)

        const vendor = await vendorModel.findOne({ user: decoded.id })

        // check order belongs to this vendor
        const order = await orderModel.findOne({
            _id: orderId,
            "items.vendor": vendor._id
        })

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        // Update only the vendor's items in the order
        const updatedOrder = await orderModel.findOneAndUpdate(
            { 
                _id: orderId,
                "items.vendor": vendor._id
            },
            { 
                $set: { "items.$.status": status }
            },
            { new: true }
        )
        res.status(200).json({ success: true, message: "Order status updated successfully", order: updatedOrder })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const {page=1,limit=10} = req.query
        const token = req.cookies.token
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const vendor = await vendorModel.findOne({ user: decoded.id })
        const products = await productModel.find({ vendor: vendor._id }).limit(limit).skip((page - 1) * limit)
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    updateOrderStatus,
    getAllProducts
}