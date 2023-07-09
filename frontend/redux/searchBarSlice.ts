import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialState {
  searchValue: string
}

const initialState = {
  searchValue: '',
}

const searchBarSlice = createSlice({
  name: 'search bar',
  initialState,
  reducers: {
    searchValueUpdated(state: initialState, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const { searchValueUpdated } = searchBarSlice.actions
export default searchBarSlice.reducer
