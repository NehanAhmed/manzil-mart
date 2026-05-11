const productModel = require("../models/product.model")
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")
const multer = require('multer')
const { uploadMultipleFiles } = require('../services/storage.service')
const vendorModel = require("../models/vendor.model")
const orderModel = require("../models/order.model")

const storage = multer.memoryStorage()
const upload = multer({ storage })
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, status } = req.body;
        const token = req.user;
        const files = req.files;
        
        const checkIfUserExistsAndIsVendor = await userModel.findOne({ _id: token.id })

        if (!checkIfUserExistsAndIsVendor || checkIfUserExistsAndIsVendor.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }

        const uploadedFiles = await uploadMultipleFiles(
            files.map(f => f.buffer.toString("base64"))
        )
        const filesArray = uploadedFiles.map((file) => file.url)
        const vendorId = await vendorModel.findOne({ user: token.id })
        if (!vendorId) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            })
        }
        const product = await productModel.create({
            name,
            description,
            price,
            stock,
            category,
            status,
            vendor: vendorId._id,
            images: filesArray
        })

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not created"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const token = req.user

        
        const checkIfUserExistsAndIsVendor = await userModel.findOne({ _id: token.id })

        if (!checkIfUserExistsAndIsVendor || checkIfUserExistsAndIsVendor.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }

        const checkIfVendorExists = await vendorModel.findOne({
            user: token.id,
            status: "approved"
        })


        if (!checkIfVendorExists) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        const vendor = await vendorModel.findOne({ user: token.id })

        const checkIfProductExists = await productModel.findOne({
            _id: productId,
            vendor: vendor._id
        })

        if (!checkIfProductExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(400).json({
                success: false,
                message: "Product not deleted"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const updates = req.body;



        const token = req.user

        
        const checkIfUserExistsAndIsVendor = await userModel.findOne({ _id: token.id })

        if (!checkIfUserExistsAndIsVendor || checkIfUserExistsAndIsVendor.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }

        const checkIfVendorExists = await userModel.findOne({
            _id: token.id,
            role: "vendor"
        })


        if (!checkIfVendorExists) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        const vendor = await vendorModel.findOne({ user: token.id })
        const checkIfProductExists = await productModel.findOne({
            _id: req.params.productId,
            vendor: vendor._id
        })

        if (!checkIfProductExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const receivedImages = req.files;

        let imageUrls = checkIfProductExists.images;

        if (receivedImages && receivedImages.length > 0) {
            const uploaded = await uploadMultipleFiles(
                receivedImages.map(f => f.buffer.toString("base64"))
            );
            imageUrls = uploaded.map(f => f.url);
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.productId,
            { ...updates, images: imageUrls },
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(401).json({
                success: false,
                message: "Product not updated"
            })
        }



        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error Occured."
        })
    }
}

const fetchProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await productModel.findOne({_id:productId});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error Occured."
        })
    }
}

const fetchProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const products = await productModel
            .find({ status: "active" })
            .skip(skip)
            .limit(Number(limit))
            .select("name description price stock images category")

        if(!products){
            return res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error Occured."
        })
    }
}

module.exports = {
    createProduct,
    upload,
    deleteProduct,
    updateProduct,
    fetchProduct,
    fetchProducts

}