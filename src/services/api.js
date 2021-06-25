import store from './store'

const myFetch = (url, method = 'GET') => {
  const appState = store.getState().app
  const headers = { 'Content-Type': 'application/json' }
  const timeoutMs = 20000

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Request timeout')), timeoutMs)

    return fetch(`${appState.networks[appState.activeNetworkIndex].explorer.replace(/\/$/, '')}/api/${url.replace(/^\//, '')}`, { method, headers }).then((response) => {
      clearTimeout(timeout)

      if (response.status !== 200) {
        return reject(response)
      }

      return resolve(response.json())
    })
  })
}

export const getBlockchain = () => myFetch('blockchain')
export const getWallet = (addressOrPublicKey = '') => myFetch(`wallets/${addressOrPublicKey}`)
export const getWalletTransactions = (id, page = 1, limit = 10) => myFetch(`wallets/${id}/transactions?page=${page}&limit=${limit}`)

export default {
  getBlockchain,
  getWallet,
  getWalletTransactions,
}
