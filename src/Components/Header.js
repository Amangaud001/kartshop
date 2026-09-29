import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const containerRef = useRef(null);
  const [hoverStyles, setHoverStyles] = useState({ opacity: 0, transform: "translateX(0px)", width: "0px" });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const navigationSchema = useMemo(() => [
    { target: "/", title: "Home" },
    { target: "/product", title: "Products" },
    { target: "/cart", title: "Cart", hasBadge: true },
    { target: "/login", title: "Login" },
    { target: "/register", title: "Register", isCTA: true }
  ], []);

  const handleMouseEnter = (e) => {
    const element = e.currentTarget;
    const container = containerRef.current;
    if (!element || !container) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setHoverStyles({
      opacity: 1,
      transform: `translateX(${elementRect.left - containerRect.left}px)`,
      width: `${elementRect.width}px`,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyles((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching execution target:", searchQuery);
    // Dynamic query routing mechanics can be handled here
  };

  return (
    <header className={`island-header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="header-island-shell">
        
        {/* Logo Section */}
        <Link to="/" className="island-brand" aria-label="ShopKart Home">
          Shop<span>Kart</span>
        </Link>

        {/* Center Positioned Glass Search Capsule */}
        <div className="nav-search-center-wrapper">
          <form onSubmit={handleSearchSubmit} className="nav-search-form">
            <input 
              type="text" 
              className="nav-search-input" 
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="nav-search-submit-btn" aria-label="Execute Search">
              <svg className="search-icon-vector" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Responsive Mobile Burger Toggle */}
        <button 
          className={`island-burger ${isMenuOpen ? "burger-engaged" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          <div className="burger-internal-bar"></div>
        </button>

        {/* Right Positioned Floating Island Pod */}
        <nav className={`island-nav-rail ${isMenuOpen ? "rail-deployed" : ""}`}>
          <div className="island-pill-pod" ref={containerRef} onMouseLeave={handleMouseLeave}>
            <div className="floating-capsule-hover-track" style={hoverStyles} />

            <ul className="island-nodes-track">
              {navigationSchema.map(({ target, title, hasBadge, isCTA }) => {
                const isActiveState = pathname === target;
                return (
                  <li key={target} className="island-node" onMouseEnter={handleMouseEnter}>
                    <Link
                      to={target}
                      className={`island-anchor ${isActiveState ? "state-active" : ""} ${isCTA ? "state-cta" : ""}`}
                    >
                      {title}
                      {hasBadge && <span className="island-badge-counter">0</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

      </div>
    </header>
  );
}
