const express = require('express')
const router = express.Router()
const { getAllProducts, updateOrderStatus } = require('../controllers/vendor.controller')
const {authVendorMiddleware} = require('../middlewares/auth.middleware')

router.get('/products', authVendorMiddleware, getAllProducts)
router.post("/update-order-status/:id", authVendorMiddleware, updateOrderStatus)
module.exports = router