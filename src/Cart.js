import React from 'react'
import './CartStyle.css'

class Cart extends React.Component {
    handleModal() {
        let modal = document.getElementById('cartModal');
        let btn = document.getElementById('cartButton');
        let span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = 'block';
        };
        span.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    render() {
        let productsInCart = this.props.state.cart;
        let items = productsInCart.map((cartItem) =>
            <div id={'cart-item'} key={cartItem.product.id} className={'cart-product'}>
                <h2 className={'cart-product-name'}>{cartItem.product.product_name}</h2>
                <img src={cartItem.product.product_image} alt={"Mug"} height={200} width={200} className={'cart-product-image'}></img>
                <h3 className={'cart-product-price'}>${cartItem.product.product_price.toFixed(2)}</h3>
                <h3>Quantity: {cartItem.amount}</h3>
                <button onClick={() => {
                    this.props.handleRemoveFromCart(cartItem);
                }}>Remove From Cart</button>
            </div>
        );

        return <div id={'main-cart'}>
            <button id={'cartButton'} onClick={this.handleModal}>Open Cart</button>
            <div id={'cartModal'} className={'modal'}>
            <div className={"modal-content"}>
                <span className={"close"}>&times;</span>
                <h1>Your cart:</h1>
                <h2 id={'cart-total'}>Total: ${this.props.state.totalCost.toFixed(2)}</h2>
                {items}
            </div>
        </div>
        </div>
    }
}
export default Cart;