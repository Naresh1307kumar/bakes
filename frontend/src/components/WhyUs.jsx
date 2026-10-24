import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles, Truck, Gift, CheckCircle2, HeartHandshake, ShieldCheck, Flame } from 'lucide-react';
import './WhyUs.css';

const PILLARS = [
  {
    id: 'homemade',
    icon: Flame,
    title: '100% Homemade Quality',
    tag: 'Small Batch Artisan',
    description: 'Baked in small batches right here in our home kitchen. No commercial premixes, no artificial flavors, and zero artificial preservatives.',
    points: ['Freshly baked on order', 'Traditional small-batch technique', 'Authentic cracked shiny crust']
  },
  {
    id: 'ingredients',
    icon: Sparkles,
    title: 'Premium Pure Ingredients',
    tag: 'Finest Cocoa & Nuts',
    description: 'We use high-grade Dutch cocoa, real rich butter, authentic Nutella, and hand-selected crunchy roasted walnuts for an ultra-decadent bite.',
    points: ['Zero palm oil or margarine', 'Pure dairy butter & rich chocolate', 'Loaded with premium roasted nuts']
  },
  {
    id: 'delivery',
    icon: Truck,
    title: 'Fast Doorstep Delivery',
    tag: 'Direct in Madurai',
    description: 'Carefully packaged and swiftly delivered straight to your door across Madurai, ensuring your brownie slabs arrive warm, intact, and fudgy.',
    points: ['Safe protective packaging', 'Express same-day / next-day delivery', 'Doorstep delivery throughout Madurai']
  },
  {
    id: 'gifting',
    icon: Gift,
    title: 'Perfect for Gifting',
    tag: 'Artisan Packaging',
    description: 'Presented in elegant gift-ready boxes with celebratory ribbons and custom greeting cards. The tastiest gift for birthdays, festivals, and loved ones.',
    points: ['Luxury festive gift boxes', 'Personalized message cards', 'Bulk event & corporate favors']
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="why-us-section">
      <div className="why-us-container">
        
        {/* Header */}
        <div className="why-us-header">
          <div className="why-us-badge">
            <Award size={16} />
            <span>The Zugar Zinger Promise</span>
          </div>
          <h2 className="why-us-title">
            Why Choose Our <span className="highlight-text">Brownie Slabs?</span>
          </h2>
          <p className="why-us-subtitle">
            We believe a brownie isn't just a dessert — it's an experience of pure chocolate happiness. Here is what makes every bite from our Madurai kitchen unforgettable.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="pillars-grid">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className={`pillar-card pillar-${pillar.id}`}>
                
                <div className="pillar-top">
                  <div className="pillar-icon-box">
                    <Icon size={26} />
                  </div>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>

                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>

                <ul className="pillar-points">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="point-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

        {/* Trust & Stats Counter Bar */}
        <div className="trust-stats-bar">
          <div className="stat-card">
            <span className="stat-number">1,200+</span>
            <span className="stat-label">Brownie Slabs Baked</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">4.9 / 5</span>
            <span className="stat-label">Customer Satisfaction</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Homemade & Eggless/Egg Options</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">Madurai</span>
            <span className="stat-label">Local Doorstep Delivery</span>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="why-us-cta-strip">
          <div className="cta-strip-text">
            <h4>Ready to taste the difference?</h4>
            <p>Order fresh 1/2 KG slabs of Classic, Nutella, Fudgy, or Nutty brownies today.</p>
          </div>
          <Link to="/menu" className="btn-why-cta">
            Explore Menu & Pricing
          </Link>
        </div>

      </div>
    </section>
  );
}
