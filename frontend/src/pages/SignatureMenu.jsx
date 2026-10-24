import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Phone, Check, Award, MapPin, ArrowLeft } from 'lucide-react';
import './SignatureMenu.css';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Classic Brownie',
    price: 400,
    weight: '1/2 KG Slab',
    image: '/assets/images/classic.png',
    tag: 'Timeless Original',
    description: 'Our traditional recipe featuring a deep, rich dark chocolate base with the signature glossy, crinkly top crust that brownie purists love.',
    highlights: ['Pure Dutch Cocoa', 'Glossy Crinkly Crust', 'Melt-in-mouth Texture']
  },
  {
    id: 2,
    name: 'Nutella Brownie',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutella.png',
    tag: 'Bestseller',
    description: 'Swirled generously with silky authentic hazelnut Nutella spread both inside the batter and on top for an ultra-decadent experience.',
    highlights: ['Real Hazelnut Nutella', 'Gooey Fudgy Core', 'Creamy Chocolate Swirls']
  },
  {
    id: 3,
    name: 'Fudgy Brownie',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/fudgy.png',
    tag: 'Dense & Rich',
    description: 'Intensely dense, moist, and loaded with pockets of molten chocolate. Specially crafted for true dark chocolate connoisseurs.',
    highlights: ['Double Dark Chocolate', 'Ultra Moist & Dense', 'Molten Cocoa Pockets']
  },
  {
    id: 4,
    name: 'Nutty Brownie',
    price: 500,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutty.png',
    tag: 'Premium Crunch',
    description: 'Generously packed with slow-roasted Californian walnuts and crunchy cashews, creating the perfect balance of chocolate richness and crunch.',
    highlights: ['Roasted Walnuts & Cashews', 'Crunchy Textured Bite', 'Pairs Great with Ice Cream']
  }
];

export default function SignatureMenu() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1 });

  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch products from Java backend if running
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = DEFAULT_PRODUCTS.map((item, idx) => {
            const remote = data[idx];
            if (remote) {
              return {
                ...item,
                name: remote.name || item.name,
                price: remote.price || item.price,
                weight: remote.weight ? `${remote.weight} Slab` : item.weight,
                description: remote.description || item.description
              };
            }
            return item;
          });
          setProducts(merged);
        }
      })
      .catch(() => {
        // Fallback to default local items
      });
  }, []);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getOrderWhatsAppLink = (product) => {
    const qty = quantities[product.id] || 1;
    const totalPrice = product.price * qty;
    const message = encodeURIComponent(
      `Hello Zugar Zinger! I would like to order:\n\n` +
      `🍫 *${product.name}*\n` +
      `📦 Quantity: *${qty} Slab(s)* (${product.weight})\n` +
      `💰 Total: *₹${totalPrice}*\n\n` +
      `Please let me know the delivery timeline to my address in Madurai.`
    );
    return `https://wa.me/919489443693?text=${message}`;
  };

  return (
    <div className="menu-page-root">
      
      {/* Clean Standalone Header for Signature Menu Tab */}
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
              <span className="standalone-tag">Signature Slabs</span>
            </div>
          </div>

          <div className="standalone-actions">
            <span className="standalone-location">
              <MapPin size={15} color="#e5a93c" />
              <span>Madurai</span>
            </span>
            <a href="tel:9489443693" className="btn-standalone-call">
              <Phone size={15} />
              <span>Call: 94894 43693</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content: ONLY the Signature Menu Content */}
      <main className="menu-page-main">
        <div className="menu-container">

          {/* Page Header */}
          <div className="menu-header">
            <div className="menu-badge">
              <Sparkles size={16} />
              <span>Artisanal 1/2 KG Slabs</span>
            </div>
            <h1 className="menu-title">
              Our Signature <span className="highlight-text">Brownie Slabs</span>
            </h1>
            <p className="menu-subtitle">
              Pure chocolate bliss handcrafted in half-kilogram slabs. Baked fresh on order in Madurai using pure dairy butter, premium cocoa, and zero preservatives.
            </p>
          </div>

          {/* Bulk Discount Notice Banner */}
          <div className="menu-offer-banner">
            <div className="banner-badge">SPECIAL OFFER</div>
            <p>
              🎉 Ordering in bulk? Enjoy <strong>5% OFF</strong> on 5+ boxes & <strong>10% OFF</strong> on 10+ boxes! Door delivery available across Madurai.
            </p>
          </div>

          {/* Product Slabs Grid */}
          <div className="products-grid">
            {products.map((product) => {
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

                      {/* WhatsApp Order Button (Hover-only highlight) */}
                      <a 
                        href={getOrderWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-order-slab"
                      >
                        <MessageSquare size={16} />
                        <span>Order ({qty} × ₹{product.price} = ₹{totalPrice})</span>
                      </a>

                    </div>

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
                <h3>Need an Assorted Box or Gifting Hamper?</h3>
                <p>Can't decide on one flavor? We can mix and match slabs or create customized celebration hampers with personalized message cards.</p>
              </div>
            </div>
            <div className="callout-actions">
              <a href="tel:9489443693" className="btn-callout-call">
                <Phone size={16} />
                <span>Call: 94894 43693</span>
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
