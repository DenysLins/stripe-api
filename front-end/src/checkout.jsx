import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = {
  checkoutSecret: null,
  products: [],
  amount: null,
  billingDetails: {
    name: '',
    address: '',
    phone: '',
  },
  isLoading: true,
}

const CheckoutContext = createContext(initialState)

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKOUT':
      return { ...state, ...action.payload }
    case 'LOADED':
      return { ...state, isLoading: false }
    default:
      return { ...state }
  }
}

const _useCheckout = () => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/checkout`, { consumerId: 2 }, { headers: { Authorization: 2 } })
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: 'UPDATE_CHECKOUT', payload: data })
      })
      .finally(() => dispatch({ type: 'LOADED' }))
  }, [])

  const updateCheckout = (payload) => dispatch({ type: 'UPDATE_CHECKOUT', payload })

  return { ...state, updateCheckout }
}

export const CheckoutProvider = ({ children }) => {
  const state = _useCheckout()
  return <CheckoutContext.Provider value={state}>{children}</CheckoutContext.Provider>
}

export const useCheckout = () => useContext(CheckoutContext)
