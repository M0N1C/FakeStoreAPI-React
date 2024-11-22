import React, { useState, useEffect } from "react";

function DeletePage() {
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
        setDeleted(true);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Our Products</h1>
      </header>

      <main>
        <section className="products-section">
          <h2>Products Available</h2>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.title}</h3>
                  <img src={product.image} alt={product.title} />
                  <p>{product.description}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <button onClick={() => handleDelete(product.id)}>Delete Product</button>
                </div>
              ))}
            </div>
          )}
          {deleted && <p>Product deleted successfully!</p>}
        </section>
      </main>

      <footer className="about-footer">
        <p>&copy; 2024 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DeletePage;
