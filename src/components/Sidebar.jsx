import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectApp } from '../slices/app'
import { ReactComponent as Portfolio } from '../assets/portfolio.svg'

const Sidebar = () => {
  const app = useSelector(selectApp)
  const baseClass = 'w-6 sm:w-8 opacity-50 hover:opacity-100 cursor-pointer mx-auto'

  return (
    <div className={clsx('Sidebar rounded-md', !app.envLoaded ? 'bg-theme-neutral-200' : 'bg-white')}>
      {app.envLoaded && (
        <>
          <Link to="/wallet">
            <Portfolio className={clsx(baseClass, 'pt-4 sm:pt-8 pb-2 sm:pb-4')} />
          </Link>
        </>
      )}
    </div>
  )
}

export default Sidebar
