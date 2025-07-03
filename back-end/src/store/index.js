const axios = require('axios')

const STORE_SERVICE_API = process.env.STORE_SERVICE_API || 'https://fakestoreapi.com'

const getProducts = async (productId) => {
  let { data } = await axios.get(`${STORE_SERVICE_API}/products/${productId}`)
  return data
}

const getCartItems = async (userId) => {
  const { data } = await axios.get(`${STORE_SERVICE_API}/carts/user/${userId}`)
  const cartItems = data[0].products.map(async (product) => await getProducts(product.productId))
  const products = await Promise.all(cartItems)
  let amount = 0

  products.forEach((product) => {
    amount += product.price
  })

  return { products, amount }
}

module.exports = {
  getProducts,
  getCartItems,
}
