const orderModel = require("../models/order.model")
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const productModel = require("../models/product.model")
const vendorModel = require("../models/vendor.model")
const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        const token = req.cookies.token

        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const customer = decoded.id
        const checkIfUserExists = await userModel.findById(customer)
        if (!checkIfUserExists) {
            return res.status(404).json({ message: "User not found" })
        }

        const productIds = items.map((item) => item.productId)

        const products = await productModel.find({
            _id: { $in: productIds },
            status: "active"
        })

        // then check if all products were found
        if (products.length !== items.length) {
            return res.status(404).json({
                success: false,
                message: "One or more products not found"
            })
        }

        const orderItems = items.map(item => {
            const product = products.find(p => p._id.toString() === item.productId)
            return {
                product: product._id,
                vendor: product.vendor,
                quantity: item.quantity,
                price: product.price
            }
        })
        const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        const order = await orderModel.create({
            customer,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount
        })

        res.status(201).json({ message: "Order created successfully", order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const getOrderByUserId = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const customer = decoded.id
        const order = await orderModel.find({ customer })
        res.status(200).json({ message: "Order fetched successfully", order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const getOrderByOrderId = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const customer = decoded.id
        const order = await orderModel.findById(req.params.orderId)
        res.status(200).json({ message: "Order fetched successfully", order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const getOrdersByVendorId = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const vendor = await vendorModel.findOne({ user: userId })
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" })
        }
        const orders = await orderModel.find({ "items.vendor": vendor._id })
            .select("items status totalAmount shippingAddress paymentMethod createdAt")
            .populate("items.product", "name images price") // only useful product fields
            .populate("customer", "name email") // not the whole user document
        const vendorOrders = orders.map(order => ({
            ...order.toObject(),
            items: order.items.filter(item => item.vendor.toString() === vendor._id.toString())
        }))
        res.status(200).json({ message: "Orders fetched successfully", orders: vendorOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const token = req.cookies.token
        if (!token) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const customer = decoded.id
        const order = await orderModel.findById(orderId)
        if (order.customer.toString() !== customer) {
            return res.status(403).json({ message: "Unauthorized" })
        }
        order.status = "cancelled"
        await order.save()
        res.status(200).json({ message: "Order cancelled successfully", order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createOrder,
    getOrderByUserId,
    getOrderByOrderId,
    getOrdersByVendorId,
    cancelOrder
}