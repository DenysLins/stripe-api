import { useCheckout } from '../checkout.jsx'
import { Button, Card, Space } from 'antd'
import { useNavigate } from 'react-router'

const CartPage = () => {
  const { products, amount } = useCheckout()
  let navigate = useNavigate()
  const handleNavigation = () => navigate('/billing-details')

  return (
    <Space direction="vertical" size={16}>
      <Card title="Your Cart" className="app-card">
        <>
          {products.map((product) => (
            <div key={product.id} className="cart-item">
              <span className="title">{product.title}</span>
              <span className="price">₹{product.price}</span>
            </div>
          ))}
          <div className="cart-item">
            <span className="cart-total">Order Total ₹{amount}</span>
          </div>
          <hr />
          <Button block onClick={handleNavigation}>
            <span className="font-weight-bold">Add Billing details</span>
          </Button>
        </>
      </Card>
    </Space>
  )
}

export default CartPage
