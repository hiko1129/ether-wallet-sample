import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Table } from 'react-bootstrap'

class AccountStatus extends Component {
  constructor(props) {
    super(props)
    this.getAccounts = this.getAccounts.bind(this)
    this.state = {
      accountsInfo: null
    }
  }

  async getBalance(address) {
    const balance = await this.props.web3.eth.getBalance(
      address,
      (err, balance) => {
        return balance
      }
    )

    return balance
  }

  async getAccounts() {
    const { web3 } = this.props
    const accounts = await web3.eth.getAccounts((err, accounts) => {
      return accounts
    })
    const accountsInfo = []
    for (const [index, address] of accounts.entries()) {
      const balance = await this.getBalance(address)
      const name =
        (await web3.eth.getCoinbase()) === address
          ? 'Main Account(Etherbase)'
          : `Account${index}`
      accountsInfo.push({
        name: name,
        address: address,
        balance: balance
      })
    }
    this.setState({ accountsInfo })
  }

  render() {
    this.getAccounts()
    const { accountsInfo } = this.state
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">Account Balance</div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accountsInfo &&
                accountsInfo.map((account, index) => {
                  return (
                    <tr key={index}>
                      <td>{account.name}</td>
                      <td>{account.address}</td>
                      <td>{account.balance}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

AccountStatus.propTypes = {
  web3: PropTypes.object
}

export default AccountStatus
