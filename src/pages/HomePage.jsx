import React, { useState, useEffect } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 
////Merging
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const savedProducts = localStorage.getItem("userProducts");
        const userProducts = savedProducts ? JSON.parse(savedProducts) : [];
        setProducts([...json, ...userProducts]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("userProducts", JSON.stringify(updatedProducts));
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Our Products</h1>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </header>

      <main>
        {loading && <p>Loading products...</p>}

        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products match your search.</p>
          )}
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 Fake Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
