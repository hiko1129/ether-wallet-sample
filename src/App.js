import React, { Component } from 'react'
import Web3 from 'web3'
import AccountStatus from './components/AccountStatus'
import SendingEther from './components/SendingEther/Form'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.getWeb3 = this.getWeb3.bind(this)
    this.state = { web3: this.getWeb3() }
  }

  getWeb3() {
    const web3 = new Web3()
    return typeof window.web3 !== 'undefined'
      ? new Web3(window.web3.currentProvider)
      : new Web3(new web3.providers.HttpProvider('http://localhost:8545'))
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        web3: this.getWeb3()
      })
    }, 30000)
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Ether Wallet</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/">
              Send Ether
            </NavItem>
          </Nav>
        </Navbar>
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <AccountStatus web3={this.state.web3} />
            </Col>
            <Col md={2} />
          </Row>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <SendingEther web3={this.state.web3} />
            </Col>
            <Col md={2} />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
