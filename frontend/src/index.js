import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store'
import { SessionProvider } from './components/Session'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const initialState = {
  entities: {
    users: {},
    invoices: {},
  },
  session: {},
}

const store = configureStore(initialState)

render(
  <Provider store={store}>
    <SessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionProvider>
  </Provider>,
  document.getElementById('root')
)
