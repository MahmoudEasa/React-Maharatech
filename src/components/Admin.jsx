import { useNavigate } from "react-router-dom";

const Admin = (props) => {
  const navigate = useNavigate();
  const style = { cursor: "pointer" };
  return (
    <>
      <h1>Admin</h1>
      <button
        onClick={() => navigate("/addProduct/new")}
        className="btn btn-primary"
      >
        Add
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <i
                  id={product.id}
                  onClick={() => navigate(`/addProduct/${product.id}`)}
                  style={style}
                  className="fa-solid fa-pen-to-square"
                ></i>
              </td>
              <td>
                <i
                  onClick={() => props.handleDelete(product)}
                  style={style}
                  className="fa-solid fa-trash"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
