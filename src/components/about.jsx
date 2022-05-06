import { Link, Outlet } from "react-router-dom"

const About = () => {
    return (
      <>
      <h1>About</h1>
      <div className="row">
        <div className="col-3">
          <ul>
            <li>
              <Link to="/about/team">Our Team</Link>
            </li>
            <li>
              <Link to="/about/company">Our Company</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
      </>
    )
}

export default About