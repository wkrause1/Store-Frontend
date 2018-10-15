import React, { Component } from 'react';
import ReactDOM from 'react-dom'
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
        if (cart.length === 0) {
            this.setState({
                cart: this.state.cart.concat([{product: product, amount: 1}]),
                totalCost: this.calculateTotalCost(),
            });
        }
        for (let i = 0; i < this.state.cart.length; i++) {
            if ((cart[i].product.id === product.id)) {
                cart[i].amount = cart[i].amount + 1;
                this.setState({
                    cart: cart,
                    totalCost: this.calculateTotalCost(),
                })
            }
            else {
                this.setState({
                    cart: this.state.cart.concat([{product: product, amount: 1}]),
                    totalCost: this.calculateTotalCost(),
                });
            }
        }
        console.log(product.product_price);
        console.log("ITEM IN CART " + product);
        console.log(this.state.totalCost);
    }

    calculateTotalCost() {
        let cart = this.state.cart;
        let newTotal = 0;
        for (let i = 0; i < cart.length; i++) {
            newTotal += cart[i].product.product_price * cart[i].amount;
        }
        console.log(newTotal);
        return newTotal;
    }
    handleRemoveFromCart(cartItem) {
        let i;
        let cart = this.state.cart;
        for (i = 0; i < cart.length; i++) {
            console.log("cart[i] prod id: " + cart[i].product.id);
            console.log("product id: " + cartItem.product.id);
            if (cart[i].product.id === cartItem.product.id) {
                cart[i].amount = cart[i].amount - 1;
            }
            if (cart[i].amount === 0) {
                cart.splice(i,1);
            }
        }
        this.setState({
            cart: cart,
            totalCost: this.calculateTotalCost(),
        })
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
