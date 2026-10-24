import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Phone, MessageSquare, ChevronRight, MapPin } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile side menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  // Helper to handle section anchors when navigating from /menu
  const getAnchorHref = (hash) => {
    return location.pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <span className="brand-icon">✨</span>
            <span className="brand-text">Zugar Zinger</span>
            <span className="brand-tag">Bakehouse</span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            <a href="#!" onClick={(e) => e.preventDefault()} className="nav-item" style={{ cursor: 'pointer' }}>Menu</a>
            <a href={getAnchorHref('#offers')} className="nav-item">Offers</a>
            <a href={getAnchorHref('#why-us')} className="nav-item">Why Us</a>
            <a href={getAnchorHref('#contact')} className="nav-item">Contact</a>
            <a href="tel:9489443693" className="btn-nav-action">
              <Phone size={16} />
              <span>Order: 94894 43693</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`mobile-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Slide-out Side Menu Drawer */}
      <aside className={`mobile-side-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <Link to="/" className="drawer-brand" onClick={closeMenu}>
            <span className="brand-icon">✨</span>
            <span className="brand-text">Zugar Zinger</span>
          </Link>
          <button 
            className="drawer-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="drawer-nav-list">
          <a href="#!" onClick={(e) => e.preventDefault()} className="drawer-link">
            <span>🍫 Menu</span>
          </a>
          <a href={getAnchorHref('#offers')} className="drawer-link" onClick={closeMenu}>
            <span>🎁 Special Offers & Deals</span>
            <ChevronRight size={18} className="chevron" />
          </a>
          <a href={getAnchorHref('#why-us')} className="drawer-link" onClick={closeMenu}>
            <span>⭐ Why Choose Us</span>
            <ChevronRight size={18} className="chevron" />
          </a>
          <a href={getAnchorHref('#contact')} className="drawer-link" onClick={closeMenu}>
            <span>📍 Contact & Location</span>
            <ChevronRight size={18} className="chevron" />
          </a>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="drawer-footer">
          <div className="drawer-location">
            <MapPin size={16} color="#e5a93c" />
            <span>Door Delivery in Madurai</span>
          </div>

          <div className="drawer-actions">
            <a href="tel:9489443693" className="btn-drawer-call">
              <Phone size={18} />
              <span>Call 94894 43693</span>
            </a>
            <a 
              href="https://wa.me/919489443693?text=Hi%20Zugar%20Zinger,%20I%20would%20like%20to%20order%20brownies!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-drawer-whatsapp"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>

      </aside>
    </>
  );
}
