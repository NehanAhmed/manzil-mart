const express = require("express")

const router = express.Router()
const { createOrder, getOrderByUserId, getOrderByOrderId, getOrdersByVendorId, cancelOrder } = require("../controllers/order.controller")
const { authMiddleware, authVendorMiddleware } = require("../middlewares/auth.middleware")

router.post("/", createOrder)
router.get("/user",authMiddleware, getOrderByUserId)
router.get("/vendor", authVendorMiddleware, getOrdersByVendorId)
router.get("/:orderId", getOrderByOrderId)
router.post("/cancel/:orderId",authMiddleware, cancelOrder)
module.exports = router