import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Phone, Check, Award, MapPin, ArrowLeft, CheckCircle2, ExternalLink, Gift, Box } from 'lucide-react';
import './SignatureMenu.css';

const CATALOGUE_URL = 'https://wa.me/c/9797223080031';

const ALL_PRODUCTS = [
  // Signature Slabs
  {
    id: 1,
    category: 'slabs',
    name: 'Classic Brownie Slab',
    price: 400,
    weight: '1/2 KG Slab',
    image: '/assets/images/classic.png',
    tag: 'Signature Slab',
    description: 'Our traditional recipe featuring a deep, rich dark chocolate base with our signature glossy, crinkly top crust.',
    highlights: ['Pure Dutch Cocoa', 'Glossy Crinkly Crust', 'Melt-in-mouth Texture']
  },
  {
    id: 2,
    category: 'slabs',
    name: 'Nutella Brownie Slab',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutella.png',
    tag: 'Bestseller',
    description: 'Swirled generously with silky authentic hazelnut Nutella spread both inside the batter and on top for an ultra-decadent bite.',
    highlights: ['Real Hazelnut Nutella', 'Gooey Fudgy Core', 'Creamy Chocolate Swirls']
  },
  {
    id: 3,
    category: 'slabs',
    name: 'Fudgy Brownie Slab',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/fudgy.png',
    tag: 'Dense & Rich',
    description: 'Intensely dense, moist, and loaded with pockets of molten chocolate. Specially crafted for true dark chocolate lovers.',
    highlights: ['Double Dark Chocolate', 'Ultra Moist & Dense', 'Molten Cocoa Pockets']
  },
  {
    id: 4,
    category: 'slabs',
    name: 'Nutty Brownie Slab',
    price: 500,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutty.png',
    tag: 'Premium Crunch',
    description: 'Generously packed with slow-roasted Californian walnuts and crunchy cashews, balancing rich cocoa with a nutty bite.',
    highlights: ['Roasted Walnuts & Cashews', 'Crunchy Textured Bite', 'Pairs Great with Ice Cream']
  },

  // Combo Boxes (from Brand Catalogue)
  {
    id: 5,
    category: 'combos',
    name: 'Mini Combo Box',
    price: 150,
    weight: '4 Brownies + 2 Cookies',
    image: '/assets/images/classic.png',
    tag: 'Value Combo',
    description: 'The perfect snacking combo box containing 4 bite-sized chocolate brownies and 2 freshly baked artisan cookies.',
    highlights: ['4 Brownies', '2 Artisan Cookies', 'Freshly Baked Combo']
  },
  {
    id: 6,
    category: 'combos',
    name: 'Medium Combo Box',
    price: 200,
    weight: '5 Brownies + 3 Cookies',
    image: '/assets/images/nutella.png',
    tag: 'Popular Combo',
    description: 'Our most popular sharing pack. Includes 5 decadent fudgy brownies accompanied by 3 rich chocolate cookies.',
    highlights: ['5 Brownies', '3 Chocolate Cookies', 'Perfect for Small Gatherings']
  },
  {
    id: 7,
    category: 'combos',
    name: 'Grand Celebration Gift Box',
    price: 550,
    weight: 'Assorted Premium Box',
    image: '/assets/images/hero.png',
    tag: 'Festive & Gifting',
    description: 'Luxurious gift-wrapped box featuring assorted brownie slices, cookies, and personalized greeting ribbons. Perfect for birthdays & festivals.',
    highlights: ['Assorted Flavors', 'Satin Ribbon Packaging', 'Free Greeting Card']
  }
];

export default function SignatureMenu() {
  const [activeTab, setActiveTab] = useState('all');
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const filteredProducts = activeTab === 'all' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeTab);

  const getOrderWhatsAppLink = (product) => {
    const qty = quantities[product.id] || 1;
    const totalPrice = product.price * qty;
    const message = encodeURIComponent(
      `Hello Zugar Zinger! I would like to order from your catalogue:\n\n` +
      `🍫 *${product.name}*\n` +
      `📦 Quantity: *${qty} Box(es)* (${product.weight})\n` +
      `💰 Total: *₹${totalPrice}*\n\n` +
      `Catalogue Ref: ${CATALOGUE_URL}\n` +
      `Please let me know the delivery timeline to my address in Madurai.`
    );
    return `https://wa.me/919489443693?text=${message}`;
  };

  return (
    <div className="menu-page-root">
      
      {/* Clean Standalone Header */}
      <header className="standalone-menu-nav">
        <div className="standalone-nav-container">
          <div className="standalone-brand-wrap">
            <Link to="/" className="btn-back-to-home" title="Return to home page">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <div className="standalone-brand">
              <span className="brand-icon">✨</span>
              <span className="brand-text">Zugar Zinger</span>
              <span className="standalone-tag">Full Menu & Catalogue</span>
            </div>
          </div>

          <div className="standalone-actions">
            <a 
              href={CATALOGUE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-catalogue-nav"
            >
              <ExternalLink size={15} />
              <span>WhatsApp Catalogue</span>
            </a>
            <a href="tel:9489443693" className="btn-standalone-call">
              <Phone size={15} />
              <span>Call: 94894 43693</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="menu-page-main">
        <div className="menu-container">

          {/* Page Header */}
          <div className="menu-header">
            <div className="menu-badge">
              <Sparkles size={16} />
              <span>Zugar Zinger Bakehouse</span>
            </div>
            <h1 className="menu-title">
              Our Complete <span className="highlight-text">Menu & Catalogue</span>
            </h1>
            <p className="menu-subtitle">
              Explore our complete handcrafted collection — from decadent 1/2 KG signature brownie slabs to mini combo boxes and festive gift hampers.
            </p>
          </div>

          {/* Official WhatsApp Catalogue Direct Banner */}
          <div className="catalogue-direct-banner">
            <div className="catalogue-banner-info">
              <span className="live-pill">LIVE ON WHATSAPP</span>
              <h3>Official WhatsApp Business Catalogue</h3>
              <p>Browse our live WhatsApp catalogue, view updated seasonal specials, and order directly in one tap.</p>
            </div>
            <a 
              href={CATALOGUE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-open-catalogue-main"
            >
              <MessageSquare size={18} />
              <span>Open in WhatsApp Catalogue</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Order Confirmation Assurance Banner */}
          <div className="order-confirmation-banner">
            <CheckCircle2 size={20} color="#4ade80" className="banner-confirm-icon" />
            <p>
              <strong>Order Confirmation:</strong> Once your order is confirmed, you will receive an official confirmation message on WhatsApp with your order summary and delivery time.
            </p>
          </div>

          {/* Filter Categories Tabs */}
          <div className="catalogue-filter-tabs">
            <button 
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Items ({ALL_PRODUCTS.length})
            </button>
            <button 
              className={`filter-tab ${activeTab === 'slabs' ? 'active' : ''}`}
              onClick={() => setActiveTab('slabs')}
            >
              1/2 KG Signature Slabs
            </button>
            <button 
              className={`filter-tab ${activeTab === 'combos' ? 'active' : ''}`}
              onClick={() => setActiveTab('combos')}
            >
              Combo Boxes & Hampers
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const totalPrice = product.price * qty;

              return (
                <div key={product.id} className="product-slab-card">
                  
                  {/* Image Container with Tag */}
                  <div className="product-img-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                    />
                    <div className="product-tag-chip">
                      {product.tag}
                    </div>
                    <div className="product-weight-chip">
                      {product.weight}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="product-card-body">
                    <div className="product-name-row">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">
                        <span className="currency">₹</span>
                        <span className="amount">{product.price}</span>
                      </div>
                    </div>

                    <p className="product-desc">{product.description}</p>

                    {/* Highlights bullet points */}
                    <div className="product-highlights">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="highlight-tag">
                          <Check size={14} color="#e5a93c" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Controls */}
                    <div className="product-order-controls">
                      
                      {/* Quantity Selector */}
                      <div className="quantity-box">
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-number">{qty}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* WhatsApp Order Button */}
                      <a 
                        href={getOrderWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-order-slab"
                      >
                        <MessageSquare size={16} />
                        <span>Order (₹{totalPrice})</span>
                      </a>

                    </div>

                    {/* Confirmation hint */}
                    <p className="card-confirm-hint">
                      ✓ Once confirmed, you will receive an order confirmation message on WhatsApp.
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Custom Gifting Box Callout */}
          <div className="menu-custom-callout">
            <div className="callout-left">
              <Award size={36} color="#e5a93c" />
              <div>
                <h3>Need Custom Party Orders or Event Platters?</h3>
                <p>We customize gift boxes with personalized ribbons and greeting notes for birthdays, anniversaries, and corporate events across Madurai.</p>
              </div>
            </div>
            <div className="callout-actions">
              <a 
                href={CATALOGUE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-callout-call"
              >
                <ExternalLink size={16} />
                <span>Open WhatsApp Catalogue</span>
              </a>
              <a href="tel:9489443693" className="btn-callout-call secondary-callout">
                <Phone size={16} />
                <span>Call Kitchen: 94894 43693</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Clean Standalone Footer */}
      <footer className="standalone-menu-footer">
        <p>© {new Date().getFullYear()} Zugar Zinger Bakehouse • Handcrafted in Madurai • Door Delivery Available</p>
      </footer>

    </div>
  );
}
