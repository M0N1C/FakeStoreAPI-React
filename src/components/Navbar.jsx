import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">
        <button className="navbar-btn">Search Products</button>
      </Link>

      <Link to="/products/create" className="navbar-link">
        <button className="navbar-btn">Create Product</button>
      </Link>
      
      <Link to="/delete" className="navbar-link">
        <button className="navbar-btn">Delete Product</button>
      </Link>

      <Link to="/update" className="navbar-link">
        <button className="navbar-btn">Update Product</button>
      </Link>
    </nav>
  );
}

export default Navbar;

