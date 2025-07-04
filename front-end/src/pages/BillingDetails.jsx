import { useCheckout } from '../checkout.jsx'
import { Button, Card } from 'antd'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import './Pages.css'

const BillingDetailsPage = () => {
  const { register, handleSubmit } = useForm()
  let navigate = useNavigate()
  const { billingDetails, updateCheckout } = useCheckout()
  console.log(billingDetails)
  const onSubmit = (data) => {
    updateCheckout({ billingDetails: data })
    navigate('/pay')
  }

  return (
    <Card title="Billing Details" className="app-card">
      <form>
        <div className="billing-group">
          <label htmlFor="username">Name</label>
          <input className="billing-input" {...register('name')} />
        </div>
        <div className="billing-group">
          <label htmlFor="address">Address</label>
          <textarea className="billing-input" {...register('address')} />
        </div>
        <div className="billing-group">
          <label htmlFor="phone">Phone</label>
          <input className="billing-input" {...register('phone')} />
        </div>
        <div className="billing-button">
          <Button block onClick={handleSubmit(onSubmit)}>
            <span className="font-weight-bold">Save & Continue</span>
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default BillingDetailsPage
