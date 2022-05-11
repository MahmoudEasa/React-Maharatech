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

  // (Add Or Delete) From Menu To Shopping Cart
  const handleAdd = (product) => {
    // A copy of the original in case of error
    const oldProducts = [...products];
    // Clone
    let allProducts = [...products];
    // Edit
    let index = allProducts.indexOf(product);
    allProducts[index] = { ...allProducts[index] };
    allProducts[index].isInCart = !allProducts[index].isInCart;
    allProducts[index].count = allProducts[index].isInCart ? 1 : 0;

    // Set State
    setProducts(allProducts);
    axios
      .put(`http://localhost:5000/products/${product.id}`, {
        isInCart: !product.isInCart,
        name: product.name,
        price: product.price,
        count: allProducts[index].isInCart ? 1 : 0,
      })
      .catch(() => {
        product.isInCart ? toast("Cannot Remove") : toast("Cannot Add");
        setProducts(oldProducts);
      });
  };

  // Delete Product In Admin
  const handleDelete = (e) => {
    // A copy of the original in case of error
    const oldProducts = [...products];

    const productsFilter = products.filter((p) => p.id !== e.id);
    setProducts(productsFilter);

    axios.delete(`http://localhost:5000/products/${e.id}`).catch(() => {
      toast.error("Cannot Delete");
      setProducts(oldProducts);
    });
  };

  // Reset Counts In Shopping Cart
  const handleReset = () => {
    // Clone
    let productsAll = [...products];
    // Edit
    productsAll.map((product) => {
      product.isInCart = false;
      product.count = 0;
      axios
        .patch(`http://localhost:5000/products/${product.id}`, {
          isInCart: false,
          count: 0,
        })
        .catch(() => {
          toast("Cannot Reset");
          window.location.reload();
        });
      return product;
    });
    setProducts(productsAll);
  };

  // Increment Count In Shopping Cart
  const incrementHandle = (product) => {
    const oldProducts = [...products];
    // Clone
    let productsAll = [...products];
    const index = productsAll.indexOf(product);
    productsAll[index] = { ...productsAll[index] };
    // Edit
    productsAll[index].count++;
    // Set State
    setProducts(productsAll);

    axios
      .put(`http://localhost:5000/products/${product.id}`, {
        isInCart: product.isInCart,
        name: product.name,
        price: product.price,
        count: product.count + 1,
      })
      .catch(() => {
        toast("Error: Cannot Increment");
        setProducts(oldProducts);
      });
  };
  const decrementHandle = (product) => {
    // Clone
    const oldProducts = [...products];
    let allProducts = [...products];
    // Edit
    let index = allProducts.indexOf(product);
    allProducts[index] = { ...allProducts[index] };
    allProducts[index].count--;
    // Set State
    setProducts(allProducts);

    axios
      .put(`http://localhost:5000/products/${product.id}`, {
        isInCart: product.isInCart,
        name: product.name,
        price: product.price,
        count: product.count - 1,
      })
      .catch(() => {
        toast("Error: Cannot Decrement");
        setProducts(oldProducts);
      });
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
                onDecrement={decrementHandle}
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
          <Route
            path="/addProduct/:id"
            element={<AddProduct products={products} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
