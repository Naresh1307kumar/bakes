import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';
import DeliveryModal from './DeliveryModal';
import './MenuSection.css';

const SIGNATURE_SLABS = [
  {
    id: 1,
    name: 'Brownie Slab 1/2kg (Heart Anniversary Special)',
    shortName: 'Heart Brownie Slab',
    price: 500,
    weight: '1/2 KG Heart Slab',
    image: '/assets/images/heart_brownie_slab.jpg',
    tag: 'Anniversary Special',
    desc: 'Heart-shaped decadent brownie slab decorated with golden pearl beads and a custom golden heart centerpiece. Perfect for anniversaries, birthdays & special moments.',
    highlights: ['Anniversary Special', 'Heart Shape Design', 'Golden Pearl Beads', 'Custom Greetings Included']
  },
  {
    id: 2,
    name: 'Premium Brownie Hamper (Customized)',
    shortName: 'Brownie Hamper',
    price: 400,
    weight: 'Customized Box',
    image: '/assets/images/brownie_hamper.jpg',
    tag: 'Bestseller Hamper',
    desc: 'Assorted artisan brownie box customized with premium toppings including KitKat, Oreo, chocolate chips, and roasted walnuts.',
    highlights: ['KitKat & Oreo Toppings', 'Roasted Crunchy Nuts', 'Special Discounts Box', 'Freshly Baked Daily']
  },
  {
    id: 3,
    name: 'Special Dream Cake with Toppers',
    shortName: 'Dream Cake',
    price: 500,
    weight: '1/2 KG Tin Cake',
    image: '/assets/images/dream_cake_toppers.jpg',
    tag: '5-Layer Trending',
    desc: 'Our famous 5-layer chocolate dream cake in a premium keepsake tin, finished with customized cake toppers for celebrations.',
    highlights: ['5 Decadent Layers', 'Molten Chocolate Ganache', 'Custom Topper Included', 'Available in 1/2kg & 1kg']
  },
  {
    id: 4,
    name: 'Mini Bytes',
    shortName: 'Mini Bytes',
    price: 120,
    weight: 'Pack of Bars (Min. Order ₹350)',
    image: '/assets/images/mini_bytes.jpg',
    tag: 'Snack Favorite',
    desc: 'Bite-sized nutty chocolate brownie fingers dipped in creamy milk chocolate and coated generously with roasted nuts.',
    highlights: ['Roasted Nutty Coating', 'Fudgy Brownie Fingers', 'Bite-sized Snacking', 'Minimum Order ₹350']
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
