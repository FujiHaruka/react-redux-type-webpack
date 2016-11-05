import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../helpers/store'
import Counter from '../containers/counter'

const rootElement = document.getElementById('site')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
      <h1>Hello</h1>
      <Counter/>
      </div>
    </Provider>,
    rootElement
  )
})
