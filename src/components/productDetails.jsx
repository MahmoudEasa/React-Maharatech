import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import qs from "query-string"

const ProductDetails = props => {
  const search = useLocation().search
  qs.parse(search)
  // console.log(res)
  const { id } = useParams();
  const product = props.products.filter(c => c.id == id)[0];
  console.log(product);

  return (
    <React.Fragment>
      <h1>ProductDetails No.{id}</h1>
      <h2>{product.name}</h2>
      <h2>Count in Shopping Cart: {product.count}</h2>
    </React.Fragment>
  )
}

export default ProductDetails