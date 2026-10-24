import React, { useState } from 'react';
import { Phone, MapPin, Truck, Clock, MessageSquare, Send, CheckCircle2, Heart, Instagram, Facebook } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    flavor: 'Classic Brownie (₹400)',
    quantity: '1 Slab (1/2 KG)',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*New Brownie Order / Inquiry - Zugar Zinger*\n\n` +
      `👤 *Name:* ${formData.name || 'Not specified'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not specified'}\n` +
      `🍫 *Selected Flavor:* ${formData.flavor}\n` +
      `📦 *Quantity:* ${formData.quantity}\n` +
      (formData.message ? `📝 *Notes/Address:* ${formData.message}\n` : '') +
      `\nPlease confirm the availability and delivery details. Thank you!`
    );
    window.open(`https://wa.me/919489443693?text=${text}`, '_blank');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-container">
        
        {/* Header */}
        <div className="contact-header">
          <div className="contact-badge">
            <Phone size={16} />
            <span>Connect & Order</span>
          </div>
          <h2 className="contact-title">
            Get in Touch with <span className="highlight-text">Zugar Zinger</span>
          </h2>
          <p className="contact-subtitle">
            Freshly baked in Madurai. Call, WhatsApp, or send an inquiry below to order your handcrafted brownie slabs or book custom party orders.
          </p>
        </div>

        {/* Main Content Grid: Info on Left, Quick Order Form on Right */}
        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-info-col">
            
            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Primary Order Line</span>
                <a href="tel:9489443693" className="contact-link">
                  +91 94894 43693
                </a>
                <p className="card-hint">Call or WhatsApp for immediate orders</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Alternate Hotline</span>
                <a href="tel:9789231215" className="contact-link">
                  +91 97892 31215
                </a>
                <p className="card-hint">Quick inquiries & bulk event support</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Kitchen Location</span>
                <span className="contact-highlight-info">Madurai, Tamil Nadu</span>
                <p className="card-hint">Artisanal home kitchen baked fresh daily</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Truck size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Delivery Service</span>
                <span className="contact-highlight-info">Door Delivery Available</span>
                <p className="card-hint">Carefully packaged delivery across Madurai city</p>
              </div>
            </div>

            <div className="delivery-timing-pill">
              <Clock size={18} color="#e5a93c" />
              <span>Orders taken 7 Days a Week • 9:00 AM – 9:00 PM</span>
            </div>

          </div>

          {/* Right Column: Interactive WhatsApp Order Form */}
          <div className="contact-form-col">
            <div className="form-card">
              <div className="form-header">
                <h3>Quick Order & Inquiries</h3>
                <p>Fill out the details below to generate a pre-filled WhatsApp message directly to our kitchen.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="order-form">
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="e.g. Priya Sharma"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="e.g. 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="flavor">Select Flavor (1/2 KG)</label>
                    <select id="flavor" name="flavor" value={formData.flavor} onChange={handleChange}>
                      <option value="Classic Brownie (₹400)">Classic Brownie – ₹400</option>
                      <option value="Nutella Brownie (₹450)">Nutella Brownie – ₹450</option>
                      <option value="Fudgy Brownie (₹450)">Fudgy Brownie – ₹450</option>
                      <option value="Nutty Brownie (₹500)">Nutty Brownie – ₹500</option>
                      <option value="Custom Bulk / Assorted Boxes">Custom Bulk / Assorted Boxes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <select id="quantity" name="quantity" value={formData.quantity} onChange={handleChange}>
                      <option value="1 Slab (1/2 KG)">1 Slab (1/2 KG)</option>
                      <option value="2 Slabs (1 KG)">2 Slabs (1 KG)</option>
                      <option value="3 Slabs (1.5 KG)">3 Slabs (1.5 KG)</option>
                      <option value="5+ Slabs (5% Discount Applied)">5+ Slabs (5% Off)</option>
                      <option value="10+ Slabs (10% Discount Applied)">10+ Slabs (10% Off)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Delivery Address / Special Notes (Optional)</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="3" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Area in Madurai, preferred delivery time, or custom gifting note..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-whatsapp">
                  <MessageSquare size={18} />
                  <span>Send Order via WhatsApp</span>
                </button>

                <p className="form-confirm-note">
                  ✓ Once your order is confirmed, you will receive an official confirmation message on WhatsApp.
                </p>

                {formSubmitted && (
                  <div className="submit-feedback">
                    <CheckCircle2 size={16} color="#4ade80" />
                    <span>Order sent! You will receive your confirmation message on WhatsApp shortly.</span>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="footer-logo">✨ Zugar Zinger</span>
            <p className="footer-tagline">Madurai's Handcrafted Brownie Slabs • Decadence in Every Bite</p>
          </div>

          <div className="footer-links">
            <a href="#menu">Menu</a>
            <a href="#offers">Offers</a>
            <a href="#why-us">Why Us</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="https://wa.me/919489443693" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        <div className="copyright-bar">
          <p>© {new Date().getFullYear()} Zugar Zinger. All rights reserved. Handcrafted with love in Madurai.</p>
        </div>

      </div>
    </footer>
  );
}
