import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import './App.css'
import CartPage from './pages/Cart'

import { CheckoutProvider } from './checkout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutProvider>
        <div className="App">
          <BrowserRouter basename="/checkout">
            <Routes>
              <Route path="/cart" element={<CartPage />} />
              {/*<Route path="billing-details">*/}
              {/*  <BillingDetailsPage/>*/}
              {/*</Route>*/}
              {/*<Route path="pay">*/}
              {/*  <PayPage/>*/}
              {/*</Route>*/}
            </Routes>
          </BrowserRouter>
        </div>
      </CheckoutProvider>
    </Elements>
  )
}

export default App
