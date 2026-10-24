import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';
import DeliveryModal from './DeliveryModal';
import './MenuSection.css';

const SIGNATURE_SLABS = [
  {
    id: 1,
    name: 'Classic Brownie Slab',
    shortName: 'Classic',
    price: 400,
    weight: '1/2 KG Slab',
    image: '/assets/images/classic.png',
    tag: 'Timeless Original',
    desc: 'Rich, dark, and perfectly balanced cocoa with our signature crinkly top crust. The ultimate gold standard of chocolate baking.',
    highlights: ['Pure Dutch Cocoa', 'Glossy Crinkly Crust', 'Melt-in-mouth Center', '100% Dairy Butter']
  },
  {
    id: 2,
    name: 'Nutella Brownie Slab',
    shortName: 'Nutella',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutella.png',
    tag: 'Bestseller',
    desc: 'Our classic fudgy base swirled generously with silky authentic hazelnut Nutella spread for an ultra-decadent experience.',
    highlights: ['Real Hazelnut Nutella', 'Gooey Fudgy Core', 'Velvety Chocolate Swirls', 'Slow-baked Daily']
  },
  {
    id: 3,
    name: 'Fudgy Brownie Slab',
    shortName: 'Fudgy',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/fudgy.png',
    tag: 'Dense & Rich',
    desc: 'Ultra dense, gooey chocolate center that melts softly with every single bite. Specially crafted for true dark cocoa lovers.',
    highlights: ['Double Dark Chocolate', 'Ultra Moist Texture', 'Molten Cocoa Pockets', 'Zero Preservatives']
  },
  {
    id: 4,
    name: 'Nutty Brownie Slab',
    shortName: 'Nutty',
    price: 500,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutty.png',
    tag: 'Premium Crunch',
    desc: 'Packed generously with slow-roasted Californian walnuts and crunchy cashews, balancing rich cocoa with a satisfying crunch.',
    highlights: ['Roasted Walnuts & Cashews', 'Crunchy Textured Bite', 'Pairs Great with Ice Cream', 'Artisanal Batch']
  }
];

export default function MenuSection() {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1 });
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [selectedSlab, setSelectedSlab] = useState(SIGNATURE_SLABS[1]); // Default to Nutella

  const selectedQty = quantities[selectedSlab.id] || 1;
  const selectedTotalPrice = selectedSlab.price * selectedQty;

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // When card is clicked: shows its menu details
  const handleCardClick = (slab) => {
    setSelectedSlab(slab);
  };

  return (
    <section id="menu" className="menu-home-section">
      <div className="menu-home-container">
        
        {/* Section Header */}
        <div className="menu-home-header">
          <div className="menu-home-badge">
            <Sparkles size={16} />
            <span>Signature Brownie Slabs</span>
          </div>
          <h2 className="menu-home-title">
            Our Signature <span className="highlight-text">Brownie Slabs</span>
          </h2>
          <p className="menu-home-subtitle">
            1/2 KG of pure chocolate bliss. Hover to pause rounding, and click any card to view its menu & order.
          </p>
        </div>

        {/* ========================================================
            THE 3D ROUNDING CAROUSEL OF THE 4 SIGNATURE SLABS
            (Stops rounding on hover; click shows menu details)
            ======================================================== */}
        <div className="rounding-viewport">
          
          {/* Ambient Lighting in Center of Ring */}
          <div className="rounding-ambient-glow"></div>

          {/* 3D Orbit Ring */}
          <div className="rounding-ring">
            {SIGNATURE_SLABS.map((slab, index) => {
              const isSelected = selectedSlab.id === slab.id;

              return (
                <div
                  key={slab.id}
                  className={`rounding-card-item card-pos-${index} ${isSelected ? 'active-selected' : ''}`}
                  onClick={() => handleCardClick(slab)}
                  title={`Click to view details for ${slab.name}`}
                >
                  {/* Card Gloss Sheen */}
                  <div className="rounding-card-sheen"></div>

                  {/* Top Image */}
                  <div className="rounding-card-img-wrap">
                    <img 
                      src={slab.image} 
                      alt={slab.name} 
                      className="rounding-card-img" 
                    />
                    <span className="rounding-card-badge">{slab.tag}</span>
                    <span className="rounding-card-weight">{slab.weight}</span>
                  </div>

                  {/* Bottom Info */}
                  <div className="rounding-card-info">
                    <h4 className="rounding-card-title">{slab.name}</h4>
                    <div className="rounding-card-price-row">
                      <span className="rounding-card-price">₹{slab.price}</span>
                      <span className="rounding-card-tap-hint">
                        {isSelected ? '✓ Showing Details' : 'Click to View'}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================
            REVEALED MENU CARD (Shown when user clicks a card)
            ======================================================== */}
        {selectedSlab && (
          <div className="revealed-menu-card animate-fade-in" id="selected-slab-menu">
            
            <div className="revealed-menu-header">
              <div className="revealed-title-group">
                <span className="revealed-badge">{selectedSlab.tag}</span>
                <h3 className="revealed-name">{selectedSlab.name}</h3>
                <p className="revealed-desc">{selectedSlab.desc}</p>
              </div>

              <div className="revealed-price-box">
                <span className="revealed-price-currency">₹</span>
                <span className="revealed-price-num">{selectedSlab.price}</span>
                <span className="revealed-price-unit">/ {selectedSlab.weight}</span>
              </div>
            </div>

            {/* Highlights Chips */}
            <div className="revealed-highlights-row">
              {selectedSlab.highlights.map((h, i) => (
                <div key={i} className="revealed-chip">
                  <Check size={14} color="#4ade80" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Menu Order Actions */}
            <div className="revealed-order-actions">
              
              {/* Quantity Selector */}
              <div className="revealed-qty-box">
                <button 
                  className="revealed-qty-btn"
                  onClick={() => updateQuantity(selectedSlab.id, -1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="revealed-qty-val">{selectedQty}</span>
                <button 
                  className="revealed-qty-btn"
                  onClick={() => updateQuantity(selectedSlab.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Order Button (Opens Swiggy/Zomato style Delivery Address Modal) */}
              <button 
                type="button"
                onClick={() => setActiveModalProduct(selectedSlab)}
                className="btn-revealed-order"
              >
                <MessageSquare size={17} />
                <span>Order {selectedSlab.shortName} (₹{selectedTotalPrice})</span>
              </button>

            </div>

            <p className="revealed-hint">
              ✓ Enter delivery address & GPS location pin in next step for door delivery
            </p>

          </div>
        )}

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
