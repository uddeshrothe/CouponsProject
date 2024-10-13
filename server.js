const express = require('express')
const bodyParser = require('body-parser')
const couponRoutes = require('./routes/coupon.routes')
const cartRoutes = require('./routes/cart.routes')
const productRoutes = require('./routes/product.routes')
const connectDB = require('./config/dbConfig')

const app = express()
app.use(bodyParser.json())

//Mongoose Connection
connectDB()

// Coupons Route 
app.use('/api', couponRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})