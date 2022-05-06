import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useLocation, useParams, useMatch } from 'react-router-dom';


import Navbar from './navbar';
import ShoppingCart from './shoppingCart';
import About from './about';
import Contact from './contact';
import Home from './home';
import ProductDetails from './productDetails';


class App extends Component {
  state = {
    products: [
      {
        id: 1,
        name: "Burger",
        count: 2,
      },
      {
        id: 2,
        name: "Fries",
        count: 0,
      },
      {
        id: 3,
        name: "Cola",
        count: 3,
      },
    ]
  }

  handelDelete = product => {
    // Clone
    // Edit
    const newProducts = this.state.products.filter(p => p.id !== product.id);
    // Set state
    this.setState(() => ({
      products: newProducts
    }))
  }

  handleReset = () => {
    // Clone
    let products = [...this.state.products];
    // Edit
    products = products.map(p => {
      p.count = 0;
      return p;
    });
    // Set State
    this.setState(() => ({
      products: products
    }))
  }

  incrementHandle = (product) => {
    // Clone
    let products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = {...products[index]};
    // Edit
    products[index].count++;
    // Set State
    this.setState(() => ({
      products
    }))
  }
  render() {
    // const { id, name } = useParams();
    // const product = products.find((p) => p._id === (id));
    return (
      <React.Fragment>
        <Navbar productsCount={this.state.products.filter(p => p.count > 0).length} />
        <main className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products/:id' element={
                    <ProductDetails
                      products={this.state.products}
                    />} />
            <Route path='/shopping' element={
              <ShoppingCart
                onReset={this.handleReset}
                products={this.state.products}
                onIncrement={this.incrementHandle}
                onDelete={this.handelDelete}
              />} 
            />
          </Routes>
          
        </main>
      </React.Fragment>
    )
  }
}

export default App