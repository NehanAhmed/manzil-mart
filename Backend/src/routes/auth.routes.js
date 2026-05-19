const express = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

router.post("/register",authControllers.upload.single("profilePicture"),authControllers.register)

router.post("/login",authControllers.login)

router.post("/logout",authControllers.logout)

router.post('/apply',authMiddleware, authControllers.applyAsVendor)

router.get('/user',authMiddleware, authControllers.fetchUser)

module.exports = router