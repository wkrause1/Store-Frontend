import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import './product.scss'
import Product from './Product'
import Cart from './Cart'

class App extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            totalCost: 0
        };
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    }

    componentWillMount() {
        let productArray = [];
        fetch('http://127.0.0.1:8000/store/').then(response => {
            return response.json();
        }).then(data => {
            productArray = data.map((product) => {
                return product
            });
            this.setState({
                products: productArray,
            });
        });
    }

    handleAddToCart(product) {
        let cart = this.state.cart;
        console.log("Entering add to cart method");
        for (let i = 0; i < this.state.cart.length; i++) {
            if ((cart[i].id == product.id)) {
                return;
            }
        }
        this.setState({
            cart: this.state.cart.concat([product]),
            totalCost: this.state.totalCost + product.product_price
        });
        console.log(product.product_price);
        console.log("ITEM IN CART " + product);
        console.log(this.state.totalCost);
    }

    handleRemoveFromCart(product) {
        let cart = this.state.cart;
        let arr = cart;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == product.id) {
                arr.splice(i,1);

            }
        }
        this.setState({
            cart: arr,
            totalCost: this.state.totalCost - product.product_price
        });
    }


    render() {
        return (
            <div>
                <Product state = {this.state} handleAddToCart={this.handleAddToCart}/>
                <Cart state = {this.state} handleAddToCart={this.handleAddToCart} handleRemoveFromCart={this.handleRemoveFromCart}/>
            </div>
        )
    }
}

export default App;
