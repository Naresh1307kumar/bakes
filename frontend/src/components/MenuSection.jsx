import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, MessageSquare, ChevronLeft, ChevronRight, LayoutGrid, Disc } from 'lucide-react';
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
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    desc: 'Rich, dark, and perfectly balanced cocoa with our signature crinkly top crust. The ultimate gold standard of chocolate baking.',
    highlights: ['Pure Dutch Cocoa', 'Glossy Crinkly Crust', 'Melt-in-mouth Center', '100% Dairy Butter'],
    cardNum: '•••• •••• •••• 0400'
  },
  {
    id: 2,
    name: 'Nutella Brownie Slab',
    shortName: 'Nutella',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutella.png',
    tag: 'Bestseller',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.55)',
    desc: 'Our classic fudgy base swirled generously with silky authentic hazelnut Nutella spread for an ultra-decadent bite.',
    highlights: ['Real Hazelnut Nutella', 'Gooey Fudgy Core', 'Velvety Chocolate Swirls', 'Slow-baked Daily'],
    cardNum: '•••• •••• •••• 0450'
  },
  {
    id: 3,
    name: 'Fudgy Brownie Slab',
    shortName: 'Fudgy',
    price: 450,
    weight: '1/2 KG Slab',
    image: '/assets/images/fudgy.png',
    tag: 'Dense & Rich',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    desc: 'Ultra dense, gooey chocolate center that melts softly with every single bite. Specially crafted for true dark cocoa lovers.',
    highlights: ['Double Dark Chocolate', 'Ultra Moist Texture', 'Molten Cocoa Pockets', 'Zero Preservatives'],
    cardNum: '•••• •••• •••• 0450'
  },
  {
    id: 4,
    name: 'Nutty Brownie Slab',
    shortName: 'Nutty',
    price: 500,
    weight: '1/2 KG Slab',
    image: '/assets/images/nutty.png',
    tag: 'Premium Crunch',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    desc: 'Packed generously with slow-roasted Californian walnuts and crunchy cashews, balancing rich cocoa with a satisfying crunch.',
    highlights: ['Roasted Walnuts & Cashews', 'Crunchy Textured Bite', 'Pairs Great with Ice Cream', 'Artisanal Batch'],
    cardNum: '•••• •••• •••• 0500'
  }
];

// 12 slots around 360 degrees (each 30 degrees apart) matching the circular fan card design
const TOTAL_SLOTS = 12;
const WHEEL_SLOTS = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
  const flavorIndex = index % SIGNATURE_SLABS.length;
  const slab = SIGNATURE_SLABS[flavorIndex];
  return {
    slotIndex: index,
    flavorIndex,
    slab,
    baseAngle: index * (360 / TOTAL_SLOTS)
  };
});

export default function MenuSection() {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1 });
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  
  // Active flavor index (0 = Classic, 1 = Nutella, 2 = Fudgy, 3 = Nutty)
  const [activeFlavorIdx, setActiveFlavorIdx] = useState(1);
  // Current wheel rotation in degrees (initial rotation puts slot 1 at 180° / 9 o'clock)
  const [wheelRotation, setWheelRotation] = useState(180 - 1 * 30);
  // View mode: 'radial' (3D circular card fan) or 'grid' (classic 4-card grid)
  const [viewMode, setViewMode] = useState('radial');

  const activeSlab = SIGNATURE_SLABS[activeFlavorIdx];
  const activeQty = quantities[activeSlab.id] || 1;
  const activeTotalPrice = activeSlab.price * activeQty;

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // Rotate wheel to a specific slot
  const selectSlot = (slot) => {
    setActiveFlavorIdx(slot.flavorIndex);
    // Target rotation brings this slot to 180 degrees (9 o'clock horizontal position)
    const targetAngle = 180 - slot.baseAngle;
    setWheelRotation(targetAngle);
  };

  // Select by flavor index directly
  const selectFlavor = (fIdx) => {
    setActiveFlavorIdx(fIdx);
    // Find slot with this flavor closest to current rotation
    const slotAngle = fIdx * 30;
    const targetAngle = 180 - slotAngle;
    setWheelRotation(targetAngle);
  };

  // Step next flavor
  const handleNext = () => {
    const nextIdx = (activeFlavorIdx + 1) % SIGNATURE_SLABS.length;
    setActiveFlavorIdx(nextIdx);
    setWheelRotation(prev => prev - 30);
  };

  // Step prev flavor
  const handlePrev = () => {
    const prevIdx = (activeFlavorIdx - 1 + SIGNATURE_SLABS.length) % SIGNATURE_SLABS.length;
    setActiveFlavorIdx(prevIdx);
    setWheelRotation(prev => prev + 30);
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

          {/* View Toggle Pill */}
          <div className="menu-view-switcher">
            <button 
              className={`view-switch-btn ${viewMode === 'radial' ? 'active' : ''}`}
              onClick={() => setViewMode('radial')}
              aria-label="3D Radial Wheel View"
            >
              <Disc size={15} />
              <span>3D Radial Showcase</span>
            </button>
            <button 
              className={`view-switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <LayoutGrid size={15} />
              <span>All Slabs Grid</span>
            </button>
          </div>
        </div>

        {/* MODE 1: 3D RADIAL FAN WHEEL (Reference Design) */}
        {viewMode === 'radial' && (
          <div className="radial-showcase-wrapper">
            <div className="radial-showcase-grid">

              {/* Left Column: Active Brownie Details & Order Controls */}
              <div className="radial-details-card">
                
                <div className="radial-tag-row">
                  <span className="radial-badge-tag">{activeSlab.tag}</span>
                  <span className="radial-weight-tag">{activeSlab.weight}</span>
                </div>

                <h3 className="radial-slab-title">{activeSlab.name}</h3>

                <div className="radial-price-row">
                  <span className="radial-price-currency">₹</span>
                  <span className="radial-price-val">{activeSlab.price}</span>
                  <span className="radial-price-sub">/ 1/2 KG Fresh Baked Slab</span>
                </div>

                <p className="radial-slab-desc">{activeSlab.desc}</p>

                {/* Flavor Switcher Pills */}
                <div className="radial-flavor-pills">
                  {SIGNATURE_SLABS.map((slab, idx) => (
                    <button
                      key={slab.id}
                      className={`flavor-pill-btn ${activeFlavorIdx === idx ? 'active' : ''}`}
                      onClick={() => selectFlavor(idx)}
                    >
                      <span>{slab.shortName}</span>
                      <small>₹{slab.price}</small>
                    </button>
                  ))}
                </div>

                {/* Highlights */}
                <div className="radial-highlights-box">
                  {activeSlab.highlights.map((h, i) => (
                    <div key={i} className="radial-highlight-pill">
                      <Check size={13} color="#4ade80" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Order Controls Row */}
                <div className="radial-order-controls">
                  
                  {/* Quantity Box */}
                  <div className="radial-qty-box">
                    <button 
                      className="radial-qty-btn"
                      onClick={() => updateQuantity(activeSlab.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="radial-qty-val">{activeQty}</span>
                    <button 
                      className="radial-qty-btn"
                      onClick={() => updateQuantity(activeSlab.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Order Button (opens Swiggy/Zomato DeliveryModal) */}
                  <button 
                    type="button"
                    onClick={() => setActiveModalProduct(activeSlab)}
                    className="btn-radial-order"
                  >
                    <MessageSquare size={17} />
                    <span>Order Slab (₹{activeTotalPrice})</span>
                  </button>

                </div>

                <p className="radial-confirm-hint">
                  ✓ Enter delivery address & GPS location pin in next step
                </p>

                {/* Wheel Rotation Stepper */}
                <div className="radial-wheel-stepper">
                  <div className="stepper-nav">
                    <button 
                      className="btn-stepper-nav" 
                      onClick={handlePrev} 
                      aria-label="Previous brownie flavor"
                    >
                      <ChevronLeft size={18} />
                      <span>Previous</span>
                    </button>
                    <span className="stepper-indicator">
                      {activeFlavorIdx + 1} / {SIGNATURE_SLABS.length}
                    </span>
                    <button 
                      className="btn-stepper-nav" 
                      onClick={handleNext} 
                      aria-label="Next brownie flavor"
                    >
                      <span>Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <span className="stepper-hint">Click any card on the wheel to rotate</span>
                </div>

              </div>

              {/* Right Column: The 3D Radial Card Fan Wheel (exact reference design!) */}
              <div className="radial-wheel-viewport">
                
                {/* Background Ambient Glow */}
                <div className="wheel-ambient-glow"></div>

                {/* Rotating Wheel Stage */}
                <div 
                  className="radial-wheel-stage"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  
                  {/* Center Hub Emblem */}
                  <div className="wheel-center-hub">
                    <div className="hub-inner">
                      <span className="hub-sparkle">✨</span>
                      <span className="hub-brand">ZUGAR ZINGER</span>
                      <span className="hub-sub">BAKEHOUSE</span>
                    </div>
                  </div>

                  {/* 12 Cards Arranged in a Radial Fan */}
                  {WHEEL_SLOTS.map((slot) => {
                    // Check if this slot is currently at the 9 o'clock active position
                    const currentAngle = (slot.baseAngle + wheelRotation) % 360;
                    // Normalized angle distance to 180°
                    const normalizedAngle = (currentAngle + 360) % 360;
                    const isActive = Math.abs(normalizedAngle - 180) < 15;

                    return (
                      <div
                        key={slot.slotIndex}
                        className={`wheel-card ${isActive ? 'active-card' : 'inactive-card'}`}
                        style={{
                          '--slot-angle': `${slot.baseAngle}deg`
                        }}
                        onClick={() => selectSlot(slot)}
                        title={`Select ${slot.slab.name}`}
                      >
                        {/* Card Gloss Sheen */}
                        <div className="card-sheen"></div>

                        {/* Top Half: Brownie Visual with Active Glow Accent */}
                        <div className="card-top-half">
                          <img 
                            src={slot.slab.image} 
                            alt={slot.slab.name} 
                            className="card-brownie-img" 
                          />
                          {/* Vibrant highlight strip (like the green card in the reference image) */}
                          <div className={`card-accent-strip ${isActive ? 'vibrant' : ''}`}></div>
                          <span className="card-chip-tag">{slot.slab.tag}</span>
                        </div>

                        {/* Bottom Half: Luxury Card Finish with Chip & Numbers */}
                        <div className="card-bottom-half">
                          <div className="card-details-row">
                            <span className="card-slab-name">{slot.slab.shortName}</span>
                            <span className="card-slab-price">₹{slot.slab.price}</span>
                          </div>

                          <div className="card-chip-row">
                            {/* Gold EMV Chip graphic matching reference image */}
                            <div className="emv-chip-graphic">
                              <div className="chip-line horizontal"></div>
                              <div className="chip-line vertical"></div>
                            </div>
                            <span className="card-embossed-num">{slot.slab.cardNum}</span>
                          </div>

                          <div className="card-brand-footer">
                            <span className="card-brand-label">ZUGAR ZINGER</span>
                            <span className="card-weight-label">{slot.slab.weight}</span>
                          </div>
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>
          </div>
        )}

        {/* MODE 2: CLASSIC 4 CARDS GRID */}
        {viewMode === 'grid' && (
          <div className="menu-cards-grid animate-fade-in">
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
