/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

export default class Item extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    pubDate: PropTypes.string.isRequired
  }

  handleSeeMore = e => {
    window.open(this.props.link)
    e.preventDefault()
  }

  render() {
    const { title, pubDate } = this.props
    return (
      <Card body className='mb-2'>
        <CardTitle>{title}</CardTitle>
        <CardText>{pubDate}</CardText>
        <Button onClick={this.handleSeeMore}>See more</Button>
      </Card>
    )
  }
}