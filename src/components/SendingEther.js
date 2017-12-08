import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

class SendingEther extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Panel header="Account Balance" />
      </div>
    )
  }
}

SendingEther.propTypes = {
  web3: PropTypes.object
}

export default SendingEther
