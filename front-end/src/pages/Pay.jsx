import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Card } from 'antd'
import { useState } from 'react'
import { useCheckout } from '../checkout.jsx'

const PayPage = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState(null)
  const { checkoutSecret, billingDetails } = useCheckout()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (elements == null) {
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      checkoutSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <Card title="Complete Payment" className="app-card">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </Card>
  )
}

export default PayPage
