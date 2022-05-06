const AddToCard = (props) => {
  const style = !props.product.isInCart
  ? {color: "#80808080",  cursor: "pointer"}
  : {cursor: "pointer"}
  return (
    <i style={style}
        onClick={() => props.onClick(props.product)}
        className="fa-solid fa-cart-plus"
    ></i>
  )
}

export default AddToCard