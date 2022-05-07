import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Navbar from "./navbar";
import ShoppingCart from "./shoppingCart";
import Home from "./Home";
import ProductDetails from "./productDetails";
import NotFound from "./notFound";
import Menu from "./Menu";
import Login from "./login";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((data) => setProducts(data.data));
  }, []);

  const handleAdd = (product) => {
    // Clone
    let productsAll = [...products];
    let index = productsAll.indexOf(product);
    productsAll[index] = { ...productsAll[index] };
    // Edit
    productsAll[index].isInCart = !productsAll[index].isInCart;
    // Set State
    setProducts(productsAll);
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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
