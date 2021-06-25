import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from './services'
import { envContext } from './contexts'
import App from './App'

test('Check it boots the SDK', () => {
  const boot = jest.fn()
  const verify = jest.fn()

  const snap = render(
    <envContext.Provider
      value={{ sdk: { boot, verify, availableNetworks: () => [] }, getProfile: () => ({ id: () => 'Test' }) }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </envContext.Provider>,
  );

  expect(verify).toHaveBeenCalled()
  expect(snap).toMatchSnapshot()
});
