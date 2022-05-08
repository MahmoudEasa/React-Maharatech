import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length > 0 && price.length > 0) {
      axios
        .post("http://localhost:5000/products", {
          name,
          price,
          count: 0,
          isInCart: false,
        })
        .then(() => navigate("/admin", { replace: true }));
    } else {
      alert("Please Write All Data");
    }

    console.log("Submit");
  };

  const handleChange = (e) => {
    let allState = { name, price };
    allState[e.currentTarget.name] = e.currentTarget.value;

    setName(allState.name);
    setPrice(allState.price);
  };
  return (
    <>
      <h1>AddProduct</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            placeholder="Product Name"
            name="name"
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            onChange={handleChange}
            value={price}
            placeholder="Price"
            name="price"
            type="number"
            className="form-control"
            id="price"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default AddProduct;
