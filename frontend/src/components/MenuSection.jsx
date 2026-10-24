import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import './MenuSection.css';

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Brownie',
    price: '₹400',
    weight: '1/2 KG',
    image: '/assets/images/classic.png',
    desc: 'Rich, dark, and perfectly balanced cocoa with our signature crinkly top crust.'
  },
  {
    id: 2,
    name: 'Nutella Brownie',
    price: '₹450',
    weight: '1/2 KG',
    image: '/assets/images/nutella.png',
    desc: 'Our classic fudgy base swirled generously with creamy hazelnut Nutella.'
  },
  {
    id: 3,
    name: 'Fudgy Brownie',
    price: '₹450',
    weight: '1/2 KG',
    image: '/assets/images/fudgy.png',
    desc: 'Ultra dense, gooey chocolate center that melts softly with every single bite.'
  },
  {
    id: 4,
    name: 'Nutty Brownie',
    price: '₹500',
    weight: '1/2 KG',
    image: '/assets/images/nutty.png',
    desc: 'Packed with slow-roasted Californian walnuts and crunchy cashews for the perfect crunch.'
  }
];

export default function MenuSection() {
  const getWhatsAppLink = (p) => {
    const text = encodeURIComponent(
      `Hello Zugar Zinger! I would like to order *${p.name} (${p.weight})* for ${p.price}. Please confirm availability.`
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
            <span>Handcrafted Slabs</span>
          </div>
          <h2 className="menu-home-title">
            Our Signature <span className="highlight-text">Brownie Slabs</span>
          </h2>
          <p className="menu-home-subtitle">
            1/2 KG of pure chocolate bliss. Freshly baked in Madurai using pure dairy butter and premium cocoa.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="menu-cards-grid">
          {PRODUCTS.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-img-wrap">
                <img src={item.image} alt={item.name} className="menu-card-img" />
                <span className="menu-card-weight">{item.weight}</span>
              </div>
              <div className="menu-card-info">
                <h3 className="menu-card-name">{item.name}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-bottom">
                  <span className="menu-card-price">{item.price}</span>
                  <a 
                    href={getWhatsAppLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-menu-order"
                  >
                    <MessageSquare size={14} />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
