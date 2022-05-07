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
  const [state, setState] = useState({
    products: [
      { name: "Burger", count: 0, price: 30, id: 1, isInCart: false },
      { name: "Fries", count: 0, price: 20, id: 2, isInCart: false },
      { name: "Cola", count: 0, price: 10, id: 3, isInCart: false },
    ],
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((data) => setProducts(data.data));
    console.log(products);
  }, []);

  const handleAdd = (product) => {
    // Clone
    let products = [...products];
    let index = products.indexOf(product);
    products[index] = { ...products[index] };
    // Edit
    products[index].isInCart = !products[index].isInCart;
    // Set State
    setProducts({ products });
  };

  const handleReset = () => {
    // Clone
    let products = [...products];
    // Edit
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    // Set State
    setProducts({ products });
  };

  const incrementHandle = (product) => {
    // Clone
    let products = [...products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    // Edit
    products[index].count++;
    // Set State
    setProducts({ products });
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
