import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Copy, Check, Gift, Users, Heart, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Offers.css';

const DEFAULT_OFFERS = [
  {
    id: 1,
    title: 'Party Saver Pack',
    discount: '5% OFF',
    condition: 'Orders above 5 boxes',
    code: 'ZUGAR5',
    tag: 'Celebration Special',
    description: 'Perfect for birthday celebrations, weekend get-togethers, and sweet cravings with friends.',
    icon: Gift,
    featured: false
  },
  {
    id: 2,
    title: 'Grand Gifting & Events',
    discount: '10% OFF',
    condition: 'Orders above 10 boxes',
    code: 'ZUGAR10',
    tag: 'Most Popular',
    description: 'Ideal for weddings, festive gifting, corporate treats, and large family occasions with custom packaging.',
    icon: Sparkles,
    featured: true
  },
  {
    id: 3,
    title: 'Loyalty Treat',
    discount: '10% OFF',
    condition: 'For all existing customers',
    code: 'LOYALTY10',
    tag: 'Repeat Customer Perk',
    description: 'Our heartfelt thank you! Returning brownie lovers enjoy an instant discount on every order.',
    icon: Heart,
    featured: false
  }
];

export default function Offers() {
  const [offers, setOffers] = useState(DEFAULT_OFFERS);
  const [copiedCode, setCopiedCode] = useState(null);

  // Optional fetch from Java backend if running
  useEffect(() => {
    fetch('http://localhost:8080/api/offers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge backend condition/title with styling metadata
          const updated = DEFAULT_OFFERS.map((item, idx) => {
            const remote = data[idx];
            if (remote) {
              return {
                ...item,
                discount: remote.title || item.discount,
                condition: remote.condition || item.condition
              };
            }
            return item;
          });
          setOffers(updated);
        }
      })
      .catch(() => {
        // Fallback to local default offers silently
      });
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const getWhatsAppLink = (offer) => {
    const text = encodeURIComponent(
      `Hello Zugar Zinger! I would like to order brownies using offer code *${offer.code}* (${offer.discount} for ${offer.condition}).`
    );
    return `https://wa.me/919489443693?text=${text}`;
  };

  return (
    <section id="offers" className="offers-section">
      <div className="offers-container">
        
        {/* Section Header */}
        <div className="offers-header">
          <div className="offers-badge">
            <Tag size={16} />
            <span>Special Savings</span>
          </div>
          <h2 className="offers-title">
            Sweet Deals & <span className="highlight-text">Special Offers</span>
          </h2>
          <p className="offers-subtitle">
            Indulge more for less! Whether you're ordering for personal cravings, grand gifting, or celebratory events in Madurai, we have delicious discounts for you.
          </p>
        </div>

        {/* Offers Cards Grid */}
        <div className="offers-grid">
          {offers.map((offer) => {
            const Icon = offer.icon || Sparkles;
            const isCopied = copiedCode === offer.code;

            return (
              <div 
                key={offer.id} 
                className={`offer-card offer-theme-${offer.id} ${offer.featured ? 'featured-card' : ''}`}
              >
                {offer.tag && (
                  <div className="offer-tag-pill">
                    <span>{offer.tag}</span>
                  </div>
                )}

                <div className="offer-card-top">
                  <div className="offer-icon-box">
                    <Icon size={24} />
                  </div>
                  <div className="discount-chip">
                    {offer.discount}
                  </div>
                </div>

                <h3 className="offer-name">{offer.title}</h3>
                <p className="offer-condition-badge">{offer.condition}</p>
                <p className="offer-description">{offer.description}</p>

                {/* Coupon Code Strip */}
                <div className="coupon-box">
                  <div className="coupon-left">
                    <span className="coupon-label">COUPON CODE</span>
                    <span className="coupon-code">{offer.code}</span>
                  </div>
                  <button 
                    className="btn-copy-code"
                    onClick={() => handleCopy(offer.code)}
                    title="Copy code"
                  >
                    {isCopied ? (
                      <>
                        <Check size={16} color="#4ade80" />
                        <span style={{ color: '#4ade80' }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Action CTA */}
                <a 
                  href={getWhatsAppLink(offer)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-claim-offer"
                >
                  <WhatsAppIcon size={16} color="#ffffff" />
                  <span>Claim via WhatsApp</span>
                  <ArrowRight size={16} />
                </a>

              </div>
            );
          })}
        </div>

        {/* Bulk Catering Banner */}
        <div className="custom-order-banner">
          <div className="banner-content">
            <div className="banner-icon">🎂</div>
            <div>
              <h3>Planning Bulk Gifting or Custom Party Orders?</h3>
              <p>We provide customized gift boxes with personalized notes for weddings, corporate hampers, and birthdays across Madurai.</p>
            </div>
          </div>
          <div className="banner-contacts">
            <a href="tel:9489443693" className="banner-call-btn">
              📞 94894 43693
            </a>
            <a href="tel:9789231215" className="banner-call-btn secondary-call">
              📞 97892 31215
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
