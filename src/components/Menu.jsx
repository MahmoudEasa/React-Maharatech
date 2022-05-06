import AddToCard from "./AddToCard"

const Menu = (props) => {
  return (
    <div>
      <h1>Menu</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Add</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{<AddToCard
                onClick={props.onClick}
                product={product}/>
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Menu