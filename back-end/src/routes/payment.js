const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { getCartItems } = require('../store')

router.post('/', async (req, res) => {
  const { userId } = req
  const { customerId } = req.body
  const cartItems = await getCartItems(userId)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartItems.amount * 100,
    currency: 'inr',
    customer: customerId,
  })
  return res.json({
    checkoutSecret: paymentIntent.client_secret,
    ...cartItems,
  })
})

module.exports = router
