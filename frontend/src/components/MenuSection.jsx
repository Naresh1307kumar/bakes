import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, MessageSquare } from 'lucide-react';
import DeliveryModal from './DeliveryModal';
import './MenuSection.css';

const SIGNATURE_SLABS = [
  {
    id: 1,
    name: 'Brownie Slab 1/2kg (Heart Special)',
    price: 500,
    weight: '1/2 KG Heart Slab',
    image: '/assets/images/heart_brownie_slab.jpg',
    tag: 'Anniversary Special',
    desc: 'Heart-shaped decadent brownie slab decorated with golden pearl beads and a custom heart centerpiece. Perfect for anniversaries & celebrations.',
    highlights: ['Special Heart Shape', 'Golden Pearl Beads', 'Custom Greetings Included']
  },
  {
    id: 2,
    name: 'Premium Brownie Hamper',
    price: 400,
    weight: 'Customized Box',
    image: '/assets/images/brownie_hamper.jpg',
    tag: 'Bestseller Hamper',
    desc: 'Assorted artisan brownie box customized with premium toppings including KitKat, Oreo, chocolate chips, and roasted walnuts.',
    highlights: ['KitKat & Oreo Toppings', 'Roasted Crunchy Nuts', 'Special Discounts Box']
  },
  {
    id: 3,
    name: 'Special Dream Cake with Toppers',
    price: 500,
    weight: '1/2 KG Tin Cake',
    image: '/assets/images/dream_cake_toppers.jpg',
    tag: '5-Layer Trending',
    desc: 'Our famous 5-layer chocolate dream cake in a premium keepsake tin, finished with customized cake toppers for birthdays & parties.',
    highlights: ['5 Decadent Layers', 'Molten Ganache', 'Custom Topper Included']
  },
  {
    id: 4,
    name: 'Mini Bytes',
    price: 120,
    weight: 'Pack of Bars (Min. Order ₹350)',
    image: '/assets/images/mini_bytes.jpg',
    tag: 'Snack Favorite',
    desc: 'Bite-sized nutty chocolate brownie fingers dipped in creamy milk chocolate and coated generously with roasted nuts.',
    highlights: ['Roasted Nutty Coating', 'Fudgy Brownie Fingers', 'Bite-sized Snacking']
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

  return (
    <section id="menu" className="menu-home-section">
      <div className="menu-home-container">

        {/* Section Header */}
        <div className="menu-home-header">
          <div className="menu-home-badge">
            <Sparkles size={16} />
            <span>Signature Collection</span>
          </div>
          <h2 className="menu-home-title">
            Our Signature <span className="highlight-text">Menu & Delights</span>
          </h2>
          <p className="menu-home-subtitle">
            Madurai's favorite handcrafted brownie slabs, dream cakes, and mini bytes baked fresh daily using pure dairy butter and rich cocoa.
          </p>

          {/* New prominent button near the 4 signature items that navigates to the full menu page */}
          <div className="menu-header-btn-wrap">
            <Link to="/menu" className="btn-explore-full-menu">
              <span>View All Menu</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Normal 4 Cards Grid */}
        <div className="menu-cards-grid">
          {SIGNATURE_SLABS.map((item) => {
            const qty = quantities[item.id] || 1;
            const total = item.price * qty;

            return (
              <div key={item.id} className={`menu-card signature-card-${item.id}`}>

                {/* Product Image & Badges */}
                <div className="menu-card-img-wrap">
                  <img src={item.image} alt={item.name} className="menu-card-img" />
                  <span className="menu-card-tag">{item.tag}</span>
                  <span className="menu-card-weight">{item.weight}</span>
                </div>

                {/* Product Details Body */}
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

        {/* Link to Full Menu Footer Strip */}
        {/* <div className="menu-home-footer-cta">
          <p>Looking for Rasamalai Dream Cakes, Cookies, Cupcakes & Custom Platters?</p>
          <Link 
            to="/menu" 
            className="btn-view-all-menu"
          >
            <span>View All Menu</span>
            <ArrowRight size={16} />
          </Link>
        </div>*/ }

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
