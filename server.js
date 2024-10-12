const express = require('express')
const bodyParser = require('body-parser')
const couponRoutes = require('./routes/coupon.routes')
const connectDB = require('./config/dbConfig')

const app = express()
app.use(bodyParser.json())

//Mongoose Connection
connectDB()

// Coupons Route 
app.use('/api', couponRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})