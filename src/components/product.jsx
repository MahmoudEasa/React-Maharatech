import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Product extends Component {
  getClasses() {
    return this.props.product.count === 0
            ? "badge bg-warning m-2"
            : "badge bg-primary m-2"
  }
  
  render() {
    return (
      <div className='row'>
        <div className="col-2">
          <span>
            <Link to={`/products/${this.props.product.id}`}>
              {this.props.product.name}
            </Link>
          </span>
        </div>
        <div className="col">
          <span className={this.getClasses()}>{this.props.product.count}</span>
          <button className='btn btn-primary btn-sm'
            onClick={() => this.props.incrementHandle(this.props.product)}
          >+</button>
          <span onClick={() => this.props.handelDelete(this.props.product)}>
            <i className="fa-solid fa-trash m-2"></i>
          </span>
        </div>
      </div>
    )
  }
}

export default Product







{/* {this.state.names.length === 0 && <h2>No Names</h2>}
<ul>
  {this.state.names.map(name => {
    return (
      <li key={name}>{name}</li>
    )
  })}
</ul> */}