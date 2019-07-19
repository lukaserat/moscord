import {} from 'dotenv/config'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

import Root from './containers'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store} >
    <Root />
  </Provider>,
  document.getElementById('root')
)
