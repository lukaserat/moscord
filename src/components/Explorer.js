/* eslint-disable jsx-a11y/anchor-is-valid */
import lo from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

export default class Explorer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onExplore: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = { value: props.value }
  }

  handleOnChange = e => {
    this.setState({ value: e.target.value })
    e.preventDefault()
  }

  handleOnLoad = e => {
    this.props.onExplore(this.state.value)
    e.preventDefault()
  }

  render() {
    const { errorMessage } = this.props
    return (
      <div className="jumbotron p-4 mt-5">
        <h1 className="display-4">RSS News Feed Viewer</h1>
        <p className="lead">Browse any rss related news feeds.</p>
        <hr className="my-4" />

        <InputGroup className="mb-3">
          <Input
            type="text"
            id="rss_url"
            value={this.state.value}
            onChange={this.handleOnChange}
            placeholder="Input rss url here.."
          />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={this.handleOnLoad}>Load Feed</Button>
          </InputGroupAddon>
        </InputGroup>

        <Alert color="danger" fade isOpen={!lo.isEmpty(errorMessage)} >
          {errorMessage}
        </Alert>
      </div>
    )
  }
}