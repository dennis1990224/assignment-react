import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import Spinner from 'react-spinner-material'
import { TextField, Button } from '@material-ui/core'
import { toast } from 'react-toastify'

import { getWallet } from '../services/api'
import { selectApp } from '../slices/app'
import { envContext } from '../contexts'
import Wallets from '../components/Wallets'

const Wallet = () => {
  const app = useSelector(selectApp)
  const env = useContext(envContext)

  const inputInitialState = {
    disabled: false,
    error: false,
    helperText: 'Address or Public key',
    value: '',
  }

  const [input, setInput] = useState(inputInitialState)
  const [createWallet, setCreateWallet] = useState({ inProgress: false, error: false })

  const handleChange = (e) => {
    const value = e.target.value.trim()
    setInput((state) => ({ ...state, ...inputInitialState, value }))
    env.validateAddress(value).then((result) => {
      if (result === true) {
        setInput((state) => ({ ...state, helperText: 'Address format looks good' }))
      }
    })
  }

  const importByAddress = (address) => env.importByAddress(address).then(() => {
    setInput((state) => ({ ...state, ...inputInitialState }))
    toast.success('Wallet imported')
  }).catch((error) => {
    setInput((state) => ({ ...state, helperText: error.message, error: true }))
  }).finally(() => {
    setInput((state) => ({ ...state, disabled: false }))
  })

  const handleImportButton = () => {
    setInput((state) => ({ ...state, disabled: true }))

    getWallet(input.value).then((response) => {
      importByAddress(response.data.address)
    }).catch((response) => {
      if (response.json) {
        return response.json().then((json) => {
          setInput((state) => ({
            ...state, helperText: json.message, error: true, disabled: false,
          }))
        })
      }
      return setInput((state) => ({
        ...state, helperText: 'Unknown error', error: true, disabled: false,
      }))
    })
  }

  const handleGenerateWalletButton = () => {
    setCreateWallet((state) => ({ ...state, inProgress: true }))
    env.generateWallet().then((result) => {
      toast.success(`Wallet created. Mnemonic is "${result.mnemonic}"`, { autoClose: false })
      setCreateWallet((state) => ({ ...state, error: false }))
    }).catch((error) => {
      toast.error(error.message)
      setCreateWallet((state) => ({ ...state, error: true }))
    }).finally(() => {
      setCreateWallet((state) => ({ ...state, inProgress: false }))
    })
  }

  const baseClass = 'Wallet w-full ml-1 sm:ml-2 rounded-md flex items-center justify-center'

  if (!app.envLoaded) {
    return (
      <div className={clsx(baseClass, 'bg-theme-neutral-200')}>
        <Spinner radius="3rem" color="#333" stroke={1} />
      </div>
    )
  }

  return (
    <div className={clsx(baseClass, 'h-full p-2 flex-wrap bg-white')}>
      <Wallets wallets={env.getProfile().wallets().all()} />
      <div className="text-center w-full max-w-sm px-2">
        <div className="my-2">
          <TextField
            disabled={input.disabled}
            inputProps={{ 'aria-label': 'wallet adress or public key' }}
            error={input.error}
            fullWidth
            value={input.value}
            onChange={handleChange}
            helperText={input.helperText}
            label="Wallet"
          />
        </div>
        <div className="mt-6 mb-2 flex justify-around">
          <div className="mx-2">
            <Button
              disabled={input.error || !input.value || input.disabled}
              color="primary"
              variant="outlined"
              onClick={handleImportButton}
            >
              {input.disabled ? 'Importing...' : 'Import'}
            </Button>
          </div>
          <div className="mx-2">
            <Button
              disabled={createWallet.inProgress || Boolean(input.value)}
              onClick={handleGenerateWalletButton}
              color="primary"
              variant="outlined"
            >
              {createWallet.inProgress ? 'Generating...' : 'Create New'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
