const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
const { upload } = require("../controllers/product.controller")
const { authVendorMiddleware } = require("../middlewares/auth.middleware")

router.post("/create",authVendorMiddleware,upload.array("files"),productController.createProduct)
router.delete("/delete/:productId",authVendorMiddleware,productController.deleteProduct)
router.patch("/update/:productId",authVendorMiddleware,upload.array("files"),  productController.updateProduct)
router.get("/fetch/:productId",productController.fetchProduct)
router.get("/fetch",productController.fetchProducts)
module.exports = router