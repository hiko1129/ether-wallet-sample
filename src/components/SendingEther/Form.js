import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Panel,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import FieldGroup from '../common/FieldGroup'
import CustomizedModal from './CustomizedModal'
import BigNumber from 'bignumber.js'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.estimatedFeeInWei = this.estimatedFeeInWei.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.submitChange = this.submitChange.bind(this)
    this.state = {
      from: '',
      to: '',
      amount: '0',
      sendEther: {
        estimatedGas: 0,
        currentGasPrice: 0
      },
      showingModal: false,
      accounts: null
    }
  }

  async componentDidMount() {
    const accounts = await this.getAccounts()
    this.setState({ accounts, from: accounts[0] })
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

    // 必要Gas量の見積もりをEthereumノードに問い合わせ
    const estimatedGas = await web3.eth.estimateGas({
      from,
      to,
      value: web3.utils.toWei(amount, 'ether')
    })

    // 現在のGas priceをEthereumノードに問い合わせ問い合わせ
    const currentGasPrice = await web3.eth.getGasPrice()
    this.setState({
      sendEther: { estimatedGas, currentGasPrice },
      showingModal: true
    })
  }

  handleChange(e) {
    const state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  closeModal() {
    this.setState({ showingModal: false })
  }

  async submitChange() {
    const { web3 } = this.props
    const { from, to, amount } = this.state
    try {
      await web3.eth.sendTransaction({
        from,
        to,
        value: web3.utils.toWei(amount, 'ether')
      })
      alert('Ether Transfer Succeeded')
    } catch (e) {
      alert('Ether Transfer Failed')
    }

    this.setState({ showingModal: false })
  }

  render() {
    const { showingModal, from, to, amount, accounts } = this.state
    const { web3 } = this.props
    const fee = web3.utils
      .fromWei(this.estimatedFeeInWei().toString(10), 'ether')
      .toString(10)
    return (
      <div>
        <Panel bsStyle="primary" header="Send Ether">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>From</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="Address"
                onChange={e => this.handleChange(e)}
                name="from">
                {!!accounts &&
                  accounts.map((account, index) => (
                    <option key={index} value={account}>
                      {account}
                    </option>
                  ))}
              </FormControl>
            </FormGroup>
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
            <Button
              bsStyle="primary"
              type="submit"
              data-toggle="modal"
              data-target="#myModal">
              Submit
            </Button>
          </form>
        </Panel>
        <CustomizedModal
          from={from}
          to={to}
          amount={amount}
          fee={fee}
          isShowing={showingModal}
          onClose={this.closeModal}
          onSubmit={this.submitChange}
        />
      </div>
    )
  }
}

Form.propTypes = {
  web3: PropTypes.object
}

export default Form
