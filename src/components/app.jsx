import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import Navbar from './navbar';
import ShoppingCart from './shoppingCart';
import About from './about';
import Contact from './contact';
import Home from './home';
import ProductDetails from './productDetails';
import NotFound from './notFound';
import Team from "./team"
import Company from "./company"
import Menu from './Menu';
import Login from './login';


const App = () => {
  const [state, setState] = useState({
    products: [
      {name: "Burger", count: 0, price: 30, id: 1, isInCart: false},
      {name: "Fries", count: 0, price: 20, id: 2, isInCart: false},
      {name: "Cola", count: 0, price: 10, id: 3, isInCart: false},
    ],
  })

  const handleAdd = (product) => {
    // Clone
    let products = [...state.products]
    let index = products.indexOf(product)
    products[index] = {...products[index]}
    // Edit
    products[index].isInCart = !products[index].isInCart
    // Set State
    setState({products})
  }

  const handleReset = () => {
    // Clone
    let products = [...state.products];
    // Edit
    products = products.map(p => {
      p.count = 0;
      return p;
    });
    // Set State
    setState({products})
  }

  const incrementHandle = (product) => {
    // Clone
    let products = [...state.products];
    const index = products.indexOf(product);
    products[index] = {...products[index]};
    // Edit
    products[index].count++;
    // Set State
    setState({products})
  }
    return (
      <React.Fragment>
        <Navbar productsCount={state.products.filter(p => p.count > 0).length} />
        <main className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />}/>
            <Route path='about' element={<About />}>
              <Route path='team' element={<Team />} />
              <Route path='company' element={<Company />} />
            </Route>
            <Route path='/contact' element={<Contact />} />
            <Route path='/products/:id' element={
                    <ProductDetails
                      products={state.products}
                    />} />
            <Route path='/shopping' element={
              <ShoppingCart
                products={state.products.filter(p => p.isInCart)}
                onIncrement={incrementHandle}
                onDelete={handleAdd}
                onReset={handleReset}
              />} 
            />
            <Route path='/menu'
                    element={<Menu
                      onClick={handleAdd}
                        products={state.products}
                      />
                    }
            />
            <Route path='/login' element={<Login />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
          
        </main>
      </React.Fragment>
    )
}

export default App
