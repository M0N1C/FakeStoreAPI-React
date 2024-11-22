import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage"; 
//import ProductDetailsPage from "./pages/ProductDetailsPage";
import DeletePage from "./pages/DeletePage";  
import UpdatePage from "./pages/UpdatePage";  
import Footer from "./components/Footer"; 

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route
          exact
          path="/products/create"
          element={<CreateProductPage onAddProject={addProduct} />}
        />
        
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


