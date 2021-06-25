/* eslint-disable arrow-body-style */

import React from 'react'
import { ARK } from '@arkecosystem/platform-sdk-ark';
import { Environment } from '@arkecosystem/platform-sdk-profiles'
import { Request } from '@arkecosystem/platform-sdk-http-axios'

import store from '../services/store'

const { config } = store.getState()

const sdk = new Environment({
  coins: { ARK },
  httpClient: new Request(),
  storage: config.storage,
})

const getProfile = () => sdk.profiles().first()

const generateWallet = () => {
  return getProfile().wallets().generate(config.coin.name, config.coin.network).then((response) => {
    return response
  })
}

const getWallet = (addressOrPublicKey) => {
  return sdk.coin(config.coin.name, config.coin.network).then((coin) => {
    return coin.client().wallet(addressOrPublicKey)
  })
}

const validateAddress = (address) => {
  return sdk.coin(config.coin.name, config.coin.network).then((coin) => {
    return coin.identity().address().validate(address)
  })
}

const importByAddress = (address) => {
  return getProfile().wallets().importByAddress(address, config.coin.name, config.coin.network)
}

export const envContextValue = {
  sdk,
  getProfile,
  generateWallet,
  getWallet,
  importByAddress,
  validateAddress,
}

export const envContext = React.createContext()

export default envContext
