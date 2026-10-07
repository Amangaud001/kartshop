import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { state, dispatch } = useContext(ThemeContext);
  const isLight = state?.theme === "light";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationSchema = useMemo(() => [
    { target: "/", title: "Home" },
    { target: "/product", title: "Products" },
    { target: "/cart", title: "Cart", hasBadge: true },
    { target: "/login", title: "Login" },
    { target: "/register", title: "Register", isCTA: true }
  ], []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className={`island-header ${isScrolled ? "header-scrolled" : ""} ${isLight ? "theme-light" : "theme-dark"}`}>
      <div className="header-island-shell">
        
        {/* Brand */}
        <Link to="/" className="island-brand">
          Shop<span>Kart</span>
        </Link>

        {/* Center Search */}
        <div className="nav-search-center-wrapper">
          <form onSubmit={handleSearchSubmit} className="nav-search-form">
            <input 
              type="text" 
              className="nav-search-input" 
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="nav-search-submit-btn" aria-label="Search">
              <svg className="search-icon-vector" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Navigation Pod */}
        <nav className="island-nav-rail">
          <div className="island-pill-pod">
            <ul className="island-nodes-track">
              {navigationSchema.map(({ target, title, hasBadge, isCTA }) => {
                const isActive = pathname === target;
                return (
                  <li key={target} className="island-node">
                    <Link
                      to={target}
                      className={`island-anchor ${isActive ? "state-active" : ""} ${isCTA ? "state-cta" : ""}`}
                    >
                      {title}
                      {hasBadge && <span className="island-badge-counter">0</span>}
                    </Link>
                  </li>
                );
              })}

              {/* Theme Toggle Button */}
              <li className="island-node">
                <button 
                  type="button" 
                  className="theme-toggle-node-btn"
                  onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                  aria-label="Toggle Theme"
                >
                  <span className="toggle-icon">{isLight ? "🌙" : "☀️"}</span>
                  <span className="toggle-label">{isLight ? "Dark" : "Light"}</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    </header>
  );
}