const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    storeName: {
        type: String,
        required: true
    },

    storeDescription: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    storeType: {
        type: String,
        enum:[
            "any",
            "groceries",
            "fashion",
            "electronics",
            "home",
            "beauty",
            "sports",
            "books",
            "toys",
            "health",
            "automotive",
            "jewelry",
            "pets",
            "baby"
        ],
        default: "any"
    },

    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "rejected",
            "suspended"
        ],
        default: "pending"
    }

}, { timestamps: true })

const vendorModel = mongoose.model("Vendor", vendorSchema)

module.exports = vendorModel