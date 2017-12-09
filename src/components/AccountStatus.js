import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import QRCode from 'qrcode.react'

class AccountStatus extends Component {
  constructor(props) {
    super(props)
    this.getAccountsInfo = this.getAccountsInfo.bind(this)
    this.state = {
      accountsInfo: null
    }
  }

  async getBalance(address) {
    const { web3 } = this.props
    const balance = await web3.eth.getBalance(address, (err, balance) => {
      return balance
    })

    const balanceEth = web3.utils.fromWei(balance, 'ether')
    return parseFloat(balanceEth).toFixed(3)
  }

  async getName(address, index) {
    const { web3 } = this.props
    const name =
      (await web3.eth.getCoinbase()) === address.toLowerCase()
        ? `Main Account(Account${index})`
        : `Account${index}`

    return name
  }

  async getAccountsInfo() {
    const { web3 } = this.props
    const accounts = await web3.eth.getAccounts((err, accounts) => {
      return accounts
    })
    const accountsInfo = []
    for (const [index, address] of accounts.entries()) {
      const balance = await this.getBalance(address)
      const name = await this.getName(address, index)
      accountsInfo.push({
        name: name,
        address: address,
        balance: balance
      })
    }
    this.setState({ accountsInfo })
  }

  render() {
    this.getAccountsInfo()
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
                      <td>
                        <QRCode value={account.address} size={64} />
                      </td>
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
