import React, { Component } from 'react'
import Header from '../layouts/Header'
import Timer from './Timer'

export class TimerApp extends Component {
  state = {
    title: 'Timer App',
  }
  render() {
    return (
      <div className="App">
        <Header title={this.state.title} />
        <Timer />
      </div>
    )
  }
}

export default TimerApp
