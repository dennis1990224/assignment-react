import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom'
import Spinner from 'react-spinner-material'
import clsx from 'clsx'

import { Sidebar, Headerbar } from './components'
import { envContext } from './contexts'
import { setState, selectApp } from './slices/app'
import { selectConfig } from './slices/config'
import { Transactions, Wallet } from './pages'

import { ReactComponent as ARKLogo } from './assets/ark.svg'

const App = () => {
  const app = useSelector(selectApp)
  const config = useSelector(selectConfig)
  const dispatch = useDispatch()
  const env = useContext(envContext)

  useEffect(() => {
    const boot = async () => {
      await env.sdk.verify()
      await env.sdk.boot()

      if (!env.getProfile()) {
        env.sdk.profiles().create(config.defaultProfileName)
        env.sdk.persist()
      }

      const networks = env.sdk.availableNetworks().map((i) => i.toObject())

      dispatch(setState({
        envLoaded: true,
        networks,
        activeNetworkIndex: networks.findIndex((i) => i.type === 'test') || 0,
      }))
    }
    boot()
  }, [env.sdk, app.activeNetworkIndex])

  return (
    <Router>
      <div className="flex min-h-screen p-2 sm:p-12 xl:p-24">
        <div className="w-full max-w-3xl mx-auto flex">
          <aside className="rounded-md w-12 sm:w-24 mr-1 sm:mr-2 content-start justify-center">
            <Link to="/">
              <ARKLogo className="Logo bg-logo text-white rounded-md mb-2 sm:mb-4 h-12 sm:h-24" />
            </Link>
            <Sidebar />
          </aside>
          <div className="flex flex-wrap w-full">
            <Headerbar />

            {app.envLoaded ? (
              <main className={clsx('Main w-full ml-1 sm:ml-2 rounded-md flex items-center justify-center', 'p-2 flex-wrap bg-white')}>
                <Switch>
                  <Route exact path="/">
                    <p className="w-full text-lg font-bold text-center">Welcome</p>
                    <p className="text-sm">
                      {`Profile ID: ${env.getProfile().id()}`}
                    </p>
                  </Route>
                  <Route path="/wallet">
                    <Wallet />
                  </Route>
                  <Route path="/transactions/:address">
                    <Transactions />
                  </Route>
                  <Route path="*">
                    <p className="text-lg">Page Not Found!</p>
                  </Route>
                </Switch>
              </main>
            ) : (
              <div className={clsx('Main w-full ml-1 sm:ml-2 rounded-md flex items-center justify-center', 'bg-theme-neutral-200')}>
                <Spinner radius="3rem" color="#333" stroke={1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
