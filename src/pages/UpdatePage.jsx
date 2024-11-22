import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProductPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Error fetching product data"));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setProductData({
      title: selectedProduct.title,
      price: selectedProduct.price,
      description: selectedProduct.description,
      image: selectedProduct.image,
      category: selectedProduct.category,
    });
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${productData.id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        setMessage("Product updated successfully!");

        const updatedProducts = JSON.parse(localStorage.getItem("userProducts")) || [];
        const updatedProductIndex = updatedProducts.findIndex(
          (product) => product.id === productData.id
        );
        if (updatedProductIndex !== -1) {
          updatedProducts[updatedProductIndex] = productData;
        } else {
          updatedProducts.push(productData);  
        }
        localStorage.setItem("userProducts", JSON.stringify(updatedProducts));

        navigate("/products");
      })
      .catch(() => {
        setLoading(false);
        setError("Error updating product");
      });
  };

  return (
    <div>
      <h1>Update Product</h1>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div>
        {filteredProducts.length > 0 && (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <button onClick={() => handleProductSelect(product.id)}>
                  {product.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {productData.title && (
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateProductPage;
