import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap'

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

FieldGroup.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  props: PropTypes.object
}

class SendingEther extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary" header="Send Ether">
          <form>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="From"
              placeholder="0x1234abcdef...."
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="To"
              placeholder="0x1234abcdef...."
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Amount(ETH)"
              placeholder="0.0"
            />
            <FieldGroup
              id="formControlsPassword"
              label="Password"
              type="password"
            />
            <Button bsStyle="primary" type="submit">
              Submit
            </Button>
          </form>
        </Panel>
      </div>
    )
  }
}

SendingEther.propTypes = {
  web3: PropTypes.object
}

export default SendingEther
