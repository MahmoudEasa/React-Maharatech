import { NavLink } from 'react-router-dom'

const Navbar = props => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to='/' className="navbar-brand">Navbar</NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to='/' className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/about' className="nav-link">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/contact' className="nav-link">Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/menu' className="nav-link">Menu</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/shopping' className="nav-link">Shopping Cart</NavLink>
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