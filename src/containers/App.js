/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Explorer from '../components/Explorer'
import Item from '../components/Item'
import { loadFeed, sortAsc } from '../actions'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    sort: PropTypes.string.isRequired,
    url: PropTypes.string,
    fetching: PropTypes.bool,
    data: PropTypes.array,
    loadFeed: PropTypes.func.isRequired,
    supportedRss: PropTypes.arrayOf(PropTypes.string)
  }

  handleLoad = (url) => {
    this.props.loadFeed(url)
  }

  handleSort = e => {
    this.props.sortAsc(this.props.sort)
    e.preventDefault()
  }

  render() {
    const { sort, url, data, errorMessage, supportedRss } = this.props
    return (
      <Container>
        <Row>
          <Col>
            <Explorer errorMessage={errorMessage} value={url} onExplore={this.handleLoad} />
            <h4>Supported RSS Feeds</h4>
            <ul className="list-unstyled">
              {supportedRss.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
            <hr />
            <Button
              color="success"
              disabled={!data.length}
              onClick={this.handleSort}
              className="mb-2">
              {`Sort by title ${sort === 'asc' ? 'desc' : 'asc'}`}
            </Button>
            {data && data.map((item, index) => <Item key={index} {...item} />)}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ errorMessage, rss }) => ({ errorMessage, ...rss })

export default connect(mapStateToProps, {
  loadFeed,
  sortAsc
})(App)
