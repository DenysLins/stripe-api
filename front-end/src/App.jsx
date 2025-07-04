import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import './App.css'
import CartPage from './pages/Cart'

import { CheckoutProvider } from './checkout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import BillingDetailsPage from './pages/BillingDetails.jsx'
import PayPage from './pages/Pay.jsx'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
}

const App = () => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutProvider>
        <div className="App">
          <BrowserRouter basename="/checkout">
            <Routes>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/billing-details" element={<BillingDetailsPage />} />
              <Route path="/pay" element={<PayPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CheckoutProvider>
    </Elements>
  )
}

export default App
