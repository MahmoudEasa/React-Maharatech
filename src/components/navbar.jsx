import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Navbar</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/about' className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to='/contact' className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to='/shopping' className="nav-link">Shopping Cart</Link>
              </li>
            </ul>
          </div>
          <span className="badge bg-primary">{props.productsCount}</span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar