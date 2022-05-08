import Product from "./product";

const ShoppingCart = (props) => {
  const { products, onReset, onIncrement, onDelete } = props;
  return (
    <>
      <div className="container">
        <h1>Shopping Cart</h1>
        <button onClick={onReset} className="btn btn-secondary btn-sm m-2">
          Reset
        </button>
        {products.map((product) => (
          <Product
            key={product.id}
            incrementHandle={onIncrement}
            product={product}
            handelDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default ShoppingCart;
