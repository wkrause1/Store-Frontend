import React, {Component} from 'react';
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

    componentDidMount() {
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
        let found = false;
        if (cart.length === 0) {
            cart = cart.concat([{product: product, amount: 1}]);
            this.setState((prevState) => {
                return {
                    cart: prevState.cart.concat(cart),
                    totalCost: product.product_price
                }
            });
        }
        else {
            for (let i = 0; i < this.state.cart.length; i++) {
                if ((cart[i].product.id === product.id)) {
                    found = true;
                    cart[i].amount = cart[i].amount + 1;
                    this.setState({
                        cart: cart,
                    });
                    this.calculateTotalCost();
                }
            }
            if (!found) {
                let prevTotal = this.calculateTotalCost();
                this.setState({
                    cart: this.state.cart.concat([{product: product, amount: 1}]),
                    totalCost: prevTotal + product.product_price,
                });
            }

        }
    }

    calculateTotalCost() {
        let cart = this.state.cart;
        let newTotal = 0;
        for (let i = 0; i < cart.length; i++) {
            console.log(cart[i].product.product_price);
            console.log(cart[i].amount);
            newTotal += cart[i].product.product_price * cart[i].amount;
        }
        this.setState((prevState) => {
            return {totalCost: newTotal}
        });
        return newTotal;
    }

    handleRemoveFromCart(cartItem) {
        let i;
        let cart = this.state.cart;
        for (i = 0; i < cart.length; i++) {
            if (cart[i].product.id === cartItem.product.id) {
                cart[i].amount = cart[i].amount - 1;
            }
            if (cart[i].amount === 0) {
                cart.splice(i, 1);
            }
        }
        this.setState({
            cart: cart,
        });
        this.calculateTotalCost();
    }


    render() {
        return (
            <div>
                <Product state={this.state} handleAddToCart={this.handleAddToCart}/>
                <Cart state={this.state} handleAddToCart={this.handleAddToCart}
                      handleRemoveFromCart={this.handleRemoveFromCart}/>
            </div>
        )
    }
}

export default App;
