import React from 'react'
import './product.scss'

class Product extends React.Component {

    render() {
        let products = this.props.state.products;
        let images = products.map((product) =>
            <img src={product.product_image} alt={''} width={200} height={200}></img>
        );
        let optionItems = products.map((product) =>
            <div id={product.id} key={product.id} className={'product'}>
                <h1 className={'product-name'}>{product.product_name}</h1>
                <h2 className={'product-description'}>{product.product_description}</h2>
                <img src={product.product_image} alt={"Mug"} height={200} width={200} className={'product-image'}></img>
                <h3 className={'product-price'}>${product.product_price}</h3>
                <button onClick={() => {
                    this.props.handleAddToCart(product);
                }}>Add To Cart</button>
            </div>
        );
        return <div className={'product-list'}>
            {optionItems}
        </div>
    }
}
export default Product;