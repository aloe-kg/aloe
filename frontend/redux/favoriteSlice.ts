import { IProduct } from '@interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios.config'

type InitialStateProps = {
  favoriteList: {
    id: number
  }[]
}

const initialState: InitialStateProps = {
  favoriteList: [],
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    hydrate(state: InitialStateProps, action: PayloadAction<{ id: number }[]>) {
      state.favoriteList = action.payload
    },

    favoriteAdded(state: InitialStateProps, action: PayloadAction<number>) {
      state.favoriteList.push({
        id: action.payload,
      })
    },

    favoriteRemoved(state: InitialStateProps, action: PayloadAction<number>) {
      state.favoriteList = state.favoriteList.filter((fav) => fav.id !== action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFavoriteItems.fulfilled, (state, action) => {
      state.favoriteList = action.payload.results.map((el) => ({
        id: el.id,
      }))
    })
  },
})

interface Returned {
  count: number
  next: null
  previous: null
  results: IProduct[]
}

export const fetchFavoriteItems = createAsyncThunk<Returned>(
  'favorite/fetchFavoriteItems',
  async function () {
    const { data } = await axios('/favorites')
    return data
  }
)

export const { hydrate, favoriteAdded, favoriteRemoved } = favoriteSlice.actions
export default favoriteSlice.reducer
