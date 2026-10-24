import React, { useState } from 'react';
import { MessageSquare, Sparkles, Check, CheckCircle2, ArrowRight } from 'lucide-react';
import DeliveryModal from './DeliveryModal';
import './MenuSection.css';

const SIGNATURE_SLABS = [
  {
    id: 1,
    name: 'Classic Brownie',
    price: 400,
    weight: '1/2 KG Slab',
    image: '/assets/images/classic.png',
    tag: 'Timeless Original',
    desc: 'Rich, dark, and perfectly balanced cocoa with our signature crinkly top crust.',
    highlights: ['Pure Dutch Cocoa', 'Glossy Crinkly Crust']
  },
  {
    id: 2,
    name: 'Nutella Brownie',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutella.png',
    tag: 'Bestseller',
    desc: 'Our classic fudgy base swirled generously with creamy hazelnut Nutella.',
    highlights: ['Real Hazelnut Nutella', 'Gooey Fudgy Core']
  },
  {
    id: 3,
    name: 'Fudgy Brownie',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/fudgy.png',
    tag: 'Dense & Rich',
    desc: 'Ultra dense, gooey chocolate center that melts softly with every single bite.',
    highlights: ['Double Dark Chocolate', 'Ultra Moist Texture']
  },
  {
    id: 4,
    name: 'Nutty Brownie',
    price: 500,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutty.png',
    tag: 'Premium Crunch',
    desc: 'Packed with slow-roasted Californian walnuts and crunchy cashews for the perfect crunch.',
    highlights: ['Roasted Walnuts & Cashews', 'Crunchy Textured Bite']
  }
];

export default function MenuSection() {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1 });
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getWhatsAppLink = (product) => {
    const qty = quantities[product.id] || 1;
    const total = product.price * qty;
    const text = encodeURIComponent(
      `Hello Zugar Zinger! I would like to order:\n\n` +
      `🍫 *${product.name}*\n` +
      `📦 Quantity: *${qty} Slab(s)* (${product.weight})\n` +
      `💰 Total: *₹${total}*\n\n` +
      `Please let me know the delivery timeline to my address in Madurai.`
    );
    return `https://wa.me/919489443693?text=${text}`;
  };

  return (
    <section id="menu" className="menu-home-section">
      <div className="menu-home-container">
        
        {/* Header */}
        <div className="menu-home-header">
          <div className="menu-home-badge">
            <Sparkles size={16} />
            <span>Signature Brownie Slabs</span>
          </div>
          <h2 className="menu-home-title">
            Our Signature <span className="highlight-text">Brownie Slabs</span>
          </h2>
          <p className="menu-home-subtitle">
            1/2 KG of pure chocolate bliss. Freshly baked in small artisan batches in Madurai using pure dairy butter, premium cocoa, and zero preservatives.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="menu-cards-grid">
          {SIGNATURE_SLABS.map((item) => {
            const qty = quantities[item.id] || 1;
            const total = item.price * qty;

            return (
              <div key={item.id} className="menu-card">
                <div className="menu-card-img-wrap">
                  <img src={item.image} alt={item.name} className="menu-card-img" />
                  <span className="menu-card-tag">{item.tag}</span>
                  <span className="menu-card-weight">{item.weight}</span>
                </div>
                
                <div className="menu-card-info">
                  <div className="menu-card-title-row">
                    <h3 className="menu-card-name">{item.name}</h3>
                    <span className="menu-card-price">₹{item.price}</span>
                  </div>

                  <p className="menu-card-desc">{item.desc}</p>

                  <div className="menu-card-highlights">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="highlight-pill">
                        <Check size={12} color="#e5a93c" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>

                  {/* Quantity & Order Row */}
                  <div className="menu-card-controls">
                    <div className="menu-qty-box">
                      <button 
                        className="menu-qty-btn" 
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="menu-qty-val">{qty}</span>
                      <button 
                        className="menu-qty-btn" 
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      type="button"
                      onClick={() => setActiveModalProduct(item)}
                      className="btn-menu-order"
                    >
                      <MessageSquare size={15} />
                      <span>Order (₹{total})</span>
                    </button>
                  </div>

                  <p className="menu-confirm-hint">
                    ✓ Enter address & location for door delivery
                  </p>

                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Menu */}
        <div className="menu-home-footer-cta">
          <p>Looking for Combo Boxes, Cookies, and Celebration Gift Packs?</p>
          <a 
            href="/menu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-view-all-menu"
          >
            <span>View All Menu</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Swiggy/Zomato style Delivery Address Modal */}
        <DeliveryModal 
          isOpen={!!activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          product={activeModalProduct}
          quantity={activeModalProduct ? quantities[activeModalProduct.id] || 1 : 1}
        />

      </div>
    </section>
  );
}
