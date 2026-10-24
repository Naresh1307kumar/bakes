import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Award, HeartHandshake, Truck, ShieldCheck } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Column: Text and Actions */}
        <div className="hero-content animate-fade-in">
          
          <div className="hero-badge">
            <Sparkles size={16} className="badge-sparkle" />
            <span>Madurai's Favorite Homemade Brownie Slabs</span>
          </div>

          <h1 className="hero-title">
            Decadence in <br />
            <span className="hero-title-highlight">Every Single Bite.</span>
          </h1>

          <p className="hero-subtitle delay-100 animate-fade-in">
            Experience the ultimate chocolate indulgence with our artisanal, homemade brownie slabs.
            Crafted with rich cocoa, crunchy nuts, and pure love — baked fresh for your special moments and gifting.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions delay-200 animate-fade-in">
            <Link 
              to="/menu" 
              className="btn-hero-primary"
            >
              <span>View All Menu</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Quick Stats / Social Proof */}
          <div className="hero-proof delay-300 animate-fade-in">
            <div className="rating-box">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#e5a93c" color="#e5a93c" />
                ))}
              </div>
              <span className="rating-text"><strong>4.9 / 5</strong> rating by brownie lovers</span>
            </div>
            <div className="proof-divider"></div>
            <div className="delivery-badge">
              <Truck size={18} color="#e5a93c" />
              <span>Door delivery across Madurai</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual animate-fade-in delay-100">
          <div className="visual-wrapper">
            <div className="ambient-glow"></div>
            
            <img 
              src="/assets/images/hero.png" 
              alt="Premium Zugar Zinger Brownie Slabs" 
              className="hero-brownie-img"
            />

            {/* Floating Info Pill 1 */}
            <div className="floating-card top-card">
              <div className="floating-icon">🍫</div>
              <div>
                <p className="floating-label">1/2 KG Slabs</p>
                <p className="floating-sub">Starting @ ₹400</p>
              </div>
            </div>

            {/* Floating Info Pill 2 */}
            <div className="floating-card bottom-card">
              <div className="floating-icon">💝</div>
              <div>
                <p className="floating-label">Special Gifting Box</p>
                <p className="floating-sub">Freshly Baked on Order</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Hero Feature Highlights Footer Bar */}
      <div className="hero-highlights">
        <div className="highlights-container">
          
          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <Award size={22} />
            </div>
            <div className="highlight-text">
              <h4>Homemade Quality</h4>
              <p>Small batches baked with pure ingredients</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <Sparkles size={22} />
            </div>
            <div className="highlight-text">
              <h4>Premium Cocoa & Nuts</h4>
              <p>Rich Nutella, walnuts & dark chocolate</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <Truck size={22} />
            </div>
            <div className="highlight-text">
              <h4>Fast Door Delivery</h4>
              <p>Direct to your home in Madurai</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <HeartHandshake size={22} />
            </div>
            <div className="highlight-text">
              <h4>Bulk Box Discounts</h4>
              <p>Up to 10% off on 10+ boxes</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
