import React from 'react'

import Product from './product'

const ShoppingCart = props => {
  return (
    <React.Fragment>
    <div className='container'>
      <h1>Shopping Cart</h1>
      <button
        onClick={props.onReset}
        className="btn btn-secondary btn-sm m-2"
      >
        Reset
      </button>
      {props.products.map(product => (
        <Product
          key={product.id}
          incrementHandle={props.onIncrement}
          product={product}
          handelDelete={props.onDelete}
        />
      ))}
    </div>
    </React.Fragment>
  )
}

export default ShoppingCart