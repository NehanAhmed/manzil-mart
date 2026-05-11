const express = require("express")
const router = express.Router()
const { loginAdmin, createAdmin, updateVendorStatus, logoutAdmin, fetchAllPendingVendors, fetchAllVendors, fetchAllProducts, fetchAllOrders } = require("../controllers/admin.controller")
const { authAdminMiddleware } = require("../middlewares/admin.middleware")

router.post("/login", loginAdmin)
router.post("/register", createAdmin)
router.post("/logout", authAdminMiddleware, logoutAdmin)
router.post("/update-vendor-status", authAdminMiddleware, updateVendorStatus)
router.get("/fetch-all-pending-vendors", authAdminMiddleware, fetchAllPendingVendors)
router.get("/fetch-all-vendors", authAdminMiddleware, fetchAllVendors)
router.get("/fetch-all-products", authAdminMiddleware, fetchAllProducts)
router.get("/fetch-all-orders", authAdminMiddleware, fetchAllOrders)

module.exports = router
