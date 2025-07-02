require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const authMiddleware = require('./middleware/auth')
const paymentRoute = require('./routes/payment')

app.use(cors())
app.use(express.json())
app.use(authMiddleware)
app.use('/checkout', paymentRoute)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
