import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   fetch("https://fakestoreapi.com/products")
     .then(res => res.json())
     .then(data => setProducts(data))
     .catch((error) => console.log("Error: ",error));
  }, []);
  
     return (
    <div className="products-page">
      <h2>Products</h2>
  
      <div className="product-container">
        {products.map((item) => {
          return (
            <ProductCard 
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
      
    </div>
  );

}

export default Products;