import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios.config'

type AddToCartAction = {
  id: number
  amount: number
}

type InitialStateProps = {
  isOpened: boolean
  cartList: {
    [id: number]: number
  }
}

const initialState: InitialStateProps = {
  isOpened: false,
  cartList: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrate(state: InitialStateProps, action: PayloadAction<InitialStateProps>) {
      return action.payload
    },

    cartFetched(state: InitialStateProps, action: PayloadAction<{ [id: number]: number }>) {
      state.cartList = action.payload
    },

    cartToggled(state: InitialStateProps, action: PayloadAction<boolean>) {
      state.isOpened = action.payload
    },

    cartUpdated(state: InitialStateProps, action: PayloadAction<AddToCartAction>) {
      state.cartList = {
        ...state.cartList,
        [action.payload.id]: action.payload.amount,
      }
    },

    removeFromCart(state: InitialStateProps, action: PayloadAction<{ id: number }>) {
      delete state.cartList[action.payload.id]
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartList = action.payload.results.reduce((acc, rec) => {
        return { ...acc, [rec.product]: rec.quantity }
      }, {})
    })
  },
})

interface Returned {
  count: number
  next: null
  previous: null
  results: any[]
}

export const fetchCartItems = createAsyncThunk<Returned>('cart/fetchCartItems', async function () {
  const { data } = await axios('/cart')
  return data
})

export const { hydrate, cartUpdated, removeFromCart, cartToggled, cartFetched } = cartSlice.actions
export default cartSlice.reducer
