import React from "react";
import "./ProductCard.css";

function ProductCard({ id, image, title, price, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title || "Product item"} loading="lazy" />
      </div>

      <h3>{title}</h3>
      <p>₹{Number(price).toLocaleString("en-IN")}</p>

      <button 
        type="button" 
        className="btn-add" 
        onClick={() => onAddToCart && onAddToCart({ id, image, title, price })}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;