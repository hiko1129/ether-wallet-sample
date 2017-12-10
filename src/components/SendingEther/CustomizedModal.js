import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

class CustomizedModal extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { isSending: false }
  }

  handleClose() {
    this.props.onClose()
  }

  async handleSubmit() {
    this.setState({ isSending: true })
    await this.props.onSubmit()
    this.setState({ isSending: false })
  }

  render() {
    const { isShowing, from, to, amount, fee } = this.props
    const { isSending } = this.state
    return (
      <div>
        <Modal show={isShowing} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>from: {from}</li>
              <li>to: {to}</li>
              <li>amount: {amount}</li>
              <li>fee: {fee}</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

CustomizedModal.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired
}

export default CustomizedModal
