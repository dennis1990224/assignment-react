import { createSlice } from '@reduxjs/toolkit'

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState: [],
  reducers: {
    add: (state, action) => ([...state, action.payload]),
  },
})

export const { setState } = walletsSlice.actions
export const selectwallets = (state) => state.wallets

export default walletsSlice.reducer
