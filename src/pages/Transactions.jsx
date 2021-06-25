import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { usePagination } from 'react-use-pagination';
import { useParams } from 'react-router-dom'

import { api } from '../services'
import { ReactComponent as Back } from '../assets/back.svg'
import { ReactComponent as Forward } from '../assets/forward.svg'

const Transactions = () => {
  const { address } = useParams()
  const initialState = {
    transactions: {
      data: [],
      meta: {},
    },
    error: false,
    message: '',
  }
  const [state, setState] = useState(initialState)

  const {
    currentPage,
    nextEnabled,
    pageSize,
    previousEnabled,
    setNextPage,
    setPreviousPage,
    totalPages,
  } = usePagination({ totalItems: state.transactions.meta.totalCount, initialPageSize: 5 })

  useEffect(() => {
    api.getWalletTransactions(address, currentPage + 1, pageSize).then((json) => {
      setState((currentState) => ({
        ...currentState,
        error: false,
        transactions: json,
      }))
    }).catch((error) => {
      error.json().then((json) => setState({
        ...initialState,
        error: true,
        message: json.message,
      }))
    })
  }, [currentPage])

  if (state.error) {
    return (
      <p className="text-theme-danger-500">
        {`Sorry, cannot load data. ${state.message}}`}
      </p>
    )
  }

  return (
    <div className="w-full">
      <p className="text-center font-bold mt-4">Transactions</p>
      <p className="text-center font-light text-xs mb-4">{address}</p>
      <div className="text-center border rounded-md my-4 mx-2 sm:mx-4 p-1">
        <div className="flex justify-around my-2 font-bold">
          <p className="w-1/2">ID</p>
          <p className="w-1/2">Confirmations</p>
        </div>
        {state.transactions.data.map((tx) => (
          <div key={tx.id} className="flex justify-around">
            <p className="w-1/2">
              ...
              {tx.id.substring(0, 6)}
            </p>
            <p className="w-1/2">{tx.confirmations}</p>
          </div>
        ))}
      </div>
      { totalPages > 1 && (
        <div className="flex justify-around items-center border border-black rounded-md my-4 mx-2 sm:mx-4 p-1">
          <Button
            onClick={setPreviousPage}
            disabled={!previousEnabled}
          >
            <Back className="h-4 sm:h-6" />
          </Button>
          <p>
            {`Page ${currentPage + 1} ${' '} of ${totalPages}`}
          </p>
          <Button
            onClick={setNextPage}
            disabled={!nextEnabled}
          >
            <Forward className="h-4 sm:h-6" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Transactions
