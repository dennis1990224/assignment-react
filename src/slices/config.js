import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    coin: {
      name: 'ARK',
      network: 'ark.devnet',
    },
    storage: 'localstorage',
    defaultProfileName: 'ARK',
  },
  reducers: {
    setState: (state, action) => ({ ...state, ...action.payload }),
  },
})

export const selectApiConfig = (state) => state.config.api
export const selectConfig = (state) => state.config
export const { setState } = configSlice.actions

export default configSlice.reducer
