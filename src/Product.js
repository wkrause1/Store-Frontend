import React from 'react'
import './product.scss'

class Product extends React.Component {

    render() {
        let products = this.props.state.products;
        let optionItems = products.map((product) =>
            <div id={'product-item'} key={product.id} className={'product'}>
                <h1 className={'product-name'}>{product.product_name}</h1>
                <h2 className={'product-description'}>{product.product_description}</h2>
                <img src={product.product_image} alt={"Mug"} height={200} width={200} className={'product-image'}></img>
                <h3 className={'product-price'}>${(product.product_price).toFixed(2)}</h3>
                <button onClick={() => {
                    this.props.handleAddToCart(product);
                }}>Add To Cart</button>
            </div>
        );
        return <div id={'product-list'}>
            {optionItems}
        </div>
    }
}
export default Product;