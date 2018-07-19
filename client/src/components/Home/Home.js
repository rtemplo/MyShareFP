import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import fetchEmailSubs from '../../queries/fetchEmailSubs'

class Home extends Component {
  
  render() {
    console.log(this.props.data)
    return (
      <div>
        Home
      </div>
    )
  }
}

export default graphql(fetchEmailSubs)(Home)