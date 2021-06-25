import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    envLoaded: false,
    networks: [
      {
        explorer: '',
      },
    ],
    activeNetworkIndex: 0,
  },
  reducers: {
    setState: (state, action) => ({ ...state, ...action.payload }),
  },
})

export const { setState } = appSlice.actions
export const selectApp = (state) => state.app

export default appSlice.reducer
