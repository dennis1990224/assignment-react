import { configureStore } from '@reduxjs/toolkit'

import { app, config, wallets } from '../slices'

export default configureStore({
  reducer: {
    app,
    config,
    wallets,
  },
})
