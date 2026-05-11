const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
     customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
            vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }, // snapshot of price at time of order
            status: { 
                type: String, 
                enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
                default: "pending" 
            }
        }
    ],
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum:["COD","CARD"],
        default: "COD"
    },
    totalAmount: {
        type: Number,
        required: true
    }
},{timestamps:true})

const orderModel = mongoose.model("Order",orderSchema)

module.exports = orderModel;