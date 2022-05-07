import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            Navbar
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/menu" className="nav-link">
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shopping" className="nav-link">
                  Shopping Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
          <span className="badge bg-primary">
            <i className="fa-solid fa-cart-plus">{props.productsCount}</i>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
