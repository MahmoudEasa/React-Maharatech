// import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import qs from "query-string"

const ProductDetails = props => {

  const navigate = useNavigate()

  const search = useLocation().search
  const res = qs.parse(search)
  // console.log(res)
  const { id } = useParams();
  const product = props.products.filter(c => c.id == id)[0];

  const handleSave = () => {
    navigate("/shopping", {replace: true})
  }

  return (
    <>
      <h1>ProductDetails No.{id}</h1>
      <h2>{product.name}</h2>
      <h2>Count in Shopping Cart: {product.count}</h2>
      <button onClick={handleSave} className="btn btn-primary btn-sm">Save</button>
    </>
  )
}

export default ProductDetails