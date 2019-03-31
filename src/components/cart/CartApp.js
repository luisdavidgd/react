import React, { Component } from 'react'
import Header from '../layouts/Header'
import ShoppingCart from './ShoppingCart'

export class CartApp extends Component {
    state = {
        title: 'Shopping Cart Demo',
    }
    render() {
        return (
            <div>
                <div className="App">
                    <Header title={this.state.title} />
                    <ShoppingCart />
                </div>
            </div>
        )
    }
}

export default CartApp
