import { cartUpdated, removeFromCart } from '@redux/cartSlice'
import { useAppDispatch } from '@redux/hooks'
import axios from 'axios.config'
import { getTokenFromCookie } from 'utils/token'

interface useCartProps {
  id: number
  amount: number
}

export const useCart = ({ id, amount }: useCartProps) => {
  const token = getTokenFromCookie()
  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    if (token) {
      axios.post('/cart/update/', [{ product: id, quantity: amount || 1 }])
    }

    dispatch(cartUpdated({ id, amount: amount || 1 }))
  }

  const incrementHandler = () => {
    if (token) {
      axios.post('/cart/update/', [{ product: id, quantity: amount + 1 }])
    }
    dispatch(cartUpdated({ id, amount: amount + 1 }))
  }

  const decrementHandler = () => {
    if (token) {
      axios.post('/cart/update/', [{ product: id, quantity: amount - 1 }])
    }

    if (amount === 1) {
      dispatch(removeFromCart({ id }))
    }
    if (amount > 1) dispatch(cartUpdated({ id, amount: amount - 1 }))
  }

  const removeHandler = () => {
    if (token) {
      axios.post('/cart/update/', [{ product: id, quantity: 0 }])
    }

    dispatch(removeFromCart({ id }))
  }

  return {
    addToCartHandler,
    incrementHandler,
    decrementHandler,
    removeHandler,
  }
}
