import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Button } from 'react-bootstrap'
import FieldGroup from '../common/FieldGroup'
import BigNumber from 'bignumber.js'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      from: '',
      to: '',
      amount: 0.0,
      password: '',
      sendEther: {
        estimatedGas: 0,
        currentGasPrice: 0
      },
      showingModal: true
    }
  }

  async getAccounts() {
    const { web3 } = this.props
    return await web3.eth.getAccounts((err, accounts) => {
      return accounts
    })
  }

  estimatedFeeInWei() {
    const { estimatedGas, currentGasPrice } = this.state.sendEther
    return new BigNumber(currentGasPrice).mul(estimatedGas)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { from, to, amount } = this.state
    const { web3 } = this.props
    const accounts = await this.getAccounts()

    if (!accounts.includes(from)) return

    // 必要Gas量の見積もりをEthereumノードに問い合わせ→ Session変数に格納
    web3.eth.estimateGas({ from, to, value: amount }, (err, estimatedGas) => {
      this.setState({ sendEther: { estimatedGas } })
    })

    // 現在のGas priceをEthereumノードに問い合わせ問い合わせ→ Session変数に格納
    web3.eth.getGasPrice((err, gasPrice) => {
      this.setState({ sendEther: { gasPrice } })
    })
  }

  handleChange(e) {
    const state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary" header="Send Ether">
          <form onSubmit={this.handleSubmit}>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="From"
              placeholder="0x1234abcdef...."
              name="from"
              onChange={e => this.handleChange(e)}
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="To"
              name="to"
              placeholder="0x1234abcdef...."
              onChange={e => this.handleChange(e)}
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Amount(ETH)"
              name="amount"
              placeholder="0.0"
              onChange={e => this.handleChange(e)}
            />
            <FieldGroup
              id="formControlsPassword"
              label="Password"
              type="password"
              name="password"
              onChange={e => this.handleChange(e)}
            />
            <Button
              bsStyle="primary"
              type="submit"
              data-toggle="modal"
              data-target="#myModal">
              Submit
            </Button>
          </form>
        </Panel>
      </div>
    )
  }
}

Form.propTypes = {
  web3: PropTypes.object
}

export default Form
