import "./ProductCard.css";

// Added object destructuring for props inside the parentheses
function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {/* Fixed the self-closing img tag and attributes placement */}
        <img src={image} alt={title} />
      </div>

      <h3>{title}</h3>
      <p>₹{price}</p>
    </div>
  );
}

export default ProductCard;
