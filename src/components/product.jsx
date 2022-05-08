import { Link } from "react-router-dom";

const Product = (props) => {
  let product = props.product;

  const getClasses = () => {
    return product.count === 0
      ? "badge bg-warning m-2"
      : "badge bg-primary m-2";
  };

  return (
    <div className="row">
      <div className="col-2">
        <span>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </span>
      </div>
      <div className="col">
        <span className={getClasses()}>{product.count}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => props.incrementHandle(product)}
        >
          +
        </button>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => props.handelDelete(product)}
        >
          <i className="fa-solid fa-trash m-2"></i>
        </span>
      </div>
    </div>
  );
};

export default Product;
