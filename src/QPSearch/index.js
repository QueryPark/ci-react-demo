// Query Park Inc. 2018

// This component provides well search interactions

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Content,
  Footer
} from './components'

import SearchBar from './SearchBar'

class QPSearch extends Component {
  constructor () {
    super()

    this.state = {
      query: ''
    }
  }

  render () {
    const {
      API_KEY
    } = this.props

    return (
      <Container>
        <Header>
          Header Child Component Here
        </Header>
        <Content>
          <SearchBar API_KEY={API_KEY} />
        </Content>
        <Footer>
          Footer Child Component Here
        </Footer>
      </Container>
    )
  }
}

QPSearch.propTypes = {
  API_KEY: PropTypes.string.isRequired
}

export default QPSearch
