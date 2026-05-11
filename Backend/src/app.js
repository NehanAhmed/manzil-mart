require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const authRoutes = require("./routes/auth.routes")
const vendorRoutes = require("./routes/vendor.routes")
const productRoutes = require("./routes/product.routes")
const adminRoutes = require("./routes/admin.routes")
const orderRoutes = require("./routes/order.routes")
// Middleware   
app.use(express.json())
app.use(cookieParser())
// ROUTES               
const routePrefix = "/api/v1"
app.use(`${routePrefix}/auth`, authRoutes)
app.use(`${routePrefix}/vendor`, vendorRoutes)
app.use(`${routePrefix}/product`, productRoutes)
app.use(`${routePrefix}/order`, orderRoutes)    
app.use(`${routePrefix}/admin`, adminRoutes)

module.exports = app    