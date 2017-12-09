import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Web3Provider } from 'react-web3'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  !window.web3 ? (
    <App />
  ) : (
    <Web3Provider>
      <App />
    </Web3Provider>
  ),
  document.getElementById('root')
)
registerServiceWorker()
