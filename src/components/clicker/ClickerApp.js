import React, { Component } from 'react'
import Header from '../layouts/Header'
import Clicker from './Clicker'

export class ClickerApp extends Component {
    state = {
        title: 'Clicker App',
    }
    render() {
        return (
            <div className="App">
                <Header title={this.state.title} />
                <Clicker />
            </div>
        )
    }
}

export default ClickerApp
