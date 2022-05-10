import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./navbar";
import ShoppingCart from "./shoppingCart";
import Home from "./Home";
import ProductDetails from "./productDetails";
import NotFound from "./notFound";
import Menu from "./Menu";
import Login from "./login";
import Admin from "./Admin";
import AddProduct from "./AddProduct";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data));
  }, []);

  const handleAdd = (product) => {
    const oldProducts = [...products];
    // Clone
    let allProducts = [...products];
    // Edit
    let index = allProducts.indexOf(product);
    allProducts[index] = { ...allProducts[index] };
    allProducts[index].isInCart = !allProducts[index].isInCart;
    // Set State
    setProducts(allProducts);
    axios
      .put(`http://localhost:5000/products/${product.id}`, {
        isInCart: !product.isInCart,
        name: product.name,
        price: product.price,
        count: product.count,
      })
      // .then((res) => (allProducts[index] = res.data))
      // .then(() => setProducts(allProducts))
      .catch(() => {
        product.isInCart ? toast("Cant Remove") : toast("Cant Add");
        setProducts(oldProducts);
      });
  };

  const handleDelete = (e) => {
    const oldProducts = [...products];

    const productsFilter = products.filter((p) => p.id !== e.id);
    setProducts(productsFilter);

    axios.delete(`http://localhost:5000/products/${e.id}`).catch(() => {
      toast.error("Cant Delete");
      setProducts(oldProducts);
    });
  };

  const handleReset = () => {
    // Clone
    let productsAll = [...products];
    // Edit
    productsAll = productsAll.map((p) => {
      p.count = 0;
      return p;
    });
    // Set State
    setProducts(productsAll);
  };

  const incrementHandle = (product) => {
    // Clone
    let productsAll = [...products];
    const index = productsAll.indexOf(product);
    productsAll[index] = { ...productsAll[index] };
    // Edit
    productsAll[index].count++;
    // Set State
    setProducts(productsAll);
  };
  return (
    <React.Fragment>
      <Navbar productsCount={products.filter((p) => p.count > 0).length} />
      <ToastContainer />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/products/:id"
            element={<ProductDetails products={products} />}
          />
          <Route
            path="/shopping"
            element={
              <ShoppingCart
                products={products.filter((p) => p.isInCart)}
                onIncrement={incrementHandle}
                onDelete={handleAdd}
                onReset={handleReset}
              />
            }
          />
          <Route
            path="/menu"
            element={<Menu onClick={handleAdd} products={products} />}
          />
          <Route
            path="/admin"
            element={<Admin products={products} handleDelete={handleDelete} />}
          />
          <Route path="/addProduct/:id" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
