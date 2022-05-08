import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const id = useParams().id;

  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      axios.get(`http://localhost:5000/products/${id}`).then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
      });
    }
  }, []);

  const handleAdd = (e) => {
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
      toast("Please Write All Data");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      count: 0,
      isInCart: false,
    };

    if (name.length > 0 && price.length > 0) {
      axios
        .put(`http://localhost:5000/products/${id}`, data)
        .then(() => navigate("/admin", { replace: true }));
    } else {
      toast("Please Write All Data");
    }
  };

  const handleChange = (e) => {
    let allState = { name, price };
    allState[e.currentTarget.name] = e.currentTarget.value;

    setName(allState.name);
    setPrice(allState.price);
  };
  return (
    <>
      <ToastContainer />
      <h1>{id === "new" ? "Add Product" : "Edit Product"}</h1>
      <form onSubmit={id === "new" ? handleAdd : handleEdit}>
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
          {id === "new" ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};

export default AddProduct;
