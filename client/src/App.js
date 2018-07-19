import React, { Component } from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App