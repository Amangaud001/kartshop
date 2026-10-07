import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css"; 
import "../App.css"; 
import headphonesImg from "../assets/image/headphones.png";
import sneakersImg from "../assets/image/Sneakers.jpg"; 


function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "boAt Rockerz 450",
      category: "Electronics",
      image: headphonesImg, // Replace with your local asset path
      price: 1599,
      originalPrice: 1999,
      quantity: 1,
    },
    {
      id: 2,
      name: "Red Tape Sneakers",
      category: "Fashion",
      image: sneakersImg, // Replace with your local asset path
      price: 2099,
      originalPrice: 2999,
      quantity: 2,
    },
  ]);

  const updateQty = (id, direction) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + direction;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  let subtotal = 0;
  let totalDiscount = 0;
  let totalItemsCount = 0;

  cartItems.forEach((item) => {
    subtotal += item.originalPrice * item.quantity;
    totalDiscount += (item.originalPrice - item.price) * item.quantity;
    totalItemsCount += item.quantity;
  });

  const finalAmount = subtotal - totalDiscount;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Left Section: Product Table Wrapper */}
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#777f89" }}>
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id} className="cart-item-row">
                    <td>
                      <div className="cart-product">
                        <div className="cart-product-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-product-info">
                          <h3>{item.name}</h3>
                          <p className="cart-category">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="cart-price">
                        <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                        <span className="original-price">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-control">
                        <button type="button" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    </td>
                    <td>
                      <strong className="item-total">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>
                    </td>
                    <td>
                      <button type="button" className="delete-btn" onClick={() => removeItem(item.id)} aria-label="Delete item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="cart-footer">
            <button type="button" className="clear-cart-btn" onClick={clearCart}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Section: Order Summary Sidebar */}
        <aside className="cart-sidebar">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItemsCount} items)</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row discount-row">
              <span>Discount</span>
              <span>−₹{totalDiscount.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total Amount</span>
              <strong>₹{finalAmount.toLocaleString("en-IN")}</strong>
            </div>
            <p className="saved-message">
              You saved ₹{totalDiscount.toLocaleString("en-IN")} on this order
            </p>
            <button type="button" className="checkout-btn">
              Proceed to Checkout <span>→</span>
            </button>
            <button type="button" className="coupon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              Apply Coupon
            </button>
          </div>
          
          <div className="secure-box">
            <svg className="secure-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#008a76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 11 11 13 15 9"></polyline>
            </svg>
            <div>
              <h3>Safe & Secure Payments</h3>
              <p>100% secure payments. Easy returns. Your data is protected.</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="cart-navigation">
        <Link to="/product" className="continue-shopping">← Continue Shopping</Link>
      </div>
    </div>
  );
}

export default Cart;
