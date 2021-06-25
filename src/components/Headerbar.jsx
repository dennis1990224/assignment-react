/* eslint-disable template-curly-spacing */
import React from 'react'
import { useSelector } from 'react-redux'

import { selectConfig } from '../slices/config'

const Headerbar = () => {
  const config = useSelector(selectConfig)

  return (
    <div className="w-full flex flex-wrap bg-logo rounded-md h-12 ml-1 sm:ml-2 mb-2 sm:mb-2 items-center text-white">
      <p className="mx-auto text-sm my-1">
        {`Coin ${ config.coin.name }`}
      </p>
      <p className="mx-auto text-sm my-1">
        {`Using network ${ config.coin.network }`}
      </p>
    </div>
  )
}

export default Headerbar
