/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import cartReducer, { hydrate as cartHydrate } from './cartSlice'
import categoriesReducer from './categoriesSlice'
import favoriteReducer, { hydrate as favoriteHydrate } from './favoriteSlice'
import searchBarReducer from './searchBarSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    favorite: favoriteReducer,
    searchBar: searchBarReducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const cartLS = loadFromLocalStorage('cart')
if (cartLS) store.dispatch(cartHydrate(cartLS))

const favoriteListLS = loadFromLocalStorage('favoriteList')
if (favoriteListLS) store.dispatch(favoriteHydrate(favoriteListLS))

store.subscribe(() => {
  saveToLocalStorage(store.getState().cart, 'cart')
})

store.subscribe(() => {
  saveToLocalStorage(store.getState().favorite.favoriteList, 'favoriteList')
})

function saveToLocalStorage(state: any, name: string) {
  try {
    const serialisedState = JSON.stringify(state)
    if (typeof window !== 'undefined') localStorage.setItem(name, serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

function loadFromLocalStorage(name: string) {
  try {
    if (typeof window !== 'undefined') {
      const persistedState = localStorage.getItem(name)
      if (persistedState) return JSON.parse(persistedState)
    }
  } catch (e) {
    console.warn(e)
  }
}
