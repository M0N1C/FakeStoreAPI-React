import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateProductPage.css'; 

function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    };

    setLoading(true);

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const savedProducts = JSON.parse(localStorage.getItem("userProducts")) || [];

        savedProducts.push(json);

        localStorage.setItem("userProducts", JSON.stringify(savedProducts));

        setLoading(false);

        setTitle("");
        setPrice("");
        setDescription("");
        setImage("");
        setCategory("");

        navigate("/projects");  
      })
      .catch((err) => {
        setError("Error al agregar el producto");
        setLoading(false);
      });
  };

  return (
    <div className="CreateProductPage">
      <h3>Create a New Product</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default CreateProductPage;
