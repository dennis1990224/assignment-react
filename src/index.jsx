import React from 'react'
import ReactDOM from 'react-dom'
import Backend from 'i18next-http-backend'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import * as serviceWorker from './serviceWorker'
import App from './App'
import store from './services/store'
import { envContext, envContextValue } from './contexts'

import 'react-toastify/dist/ReactToastify.css'

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <envContext.Provider value={envContextValue}>
        <App />
        <ToastContainer autoClose={3000} />
      </envContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
