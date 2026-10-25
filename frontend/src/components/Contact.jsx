import React, { useState } from 'react';
import { Phone, MapPin, Truck, Clock, Send, CheckCircle2, Heart, Instagram, Facebook, HelpCircle } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Contact.css';

export default function Contact() {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    topic: 'General Question',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryData.name.trim() || !inquiryData.phone.trim() || !inquiryData.message.trim()) {
      alert('Please fill out your name, phone number, and question.');
      return;
    }

    const text = encodeURIComponent(
      `*Customer Inquiry - Zugar Zinger*\n\n` +
      `👤 *Name:* ${inquiryData.name.trim()}\n` +
      `📞 *Phone / WhatsApp:* ${inquiryData.phone.trim()}\n` +
      `📌 *Topic:* ${inquiryData.topic}\n` +
      `💬 *Question / Message:*\n${inquiryData.message.trim()}\n\n` +
      `Please reply with more information. Thank you!`
    );
    const waUrl = `https://wa.me/919489443693?text=${text}`;
    try {
      const newWin = window.open(waUrl, '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = waUrl;
      }
    } catch (err) {
      window.location.href = waUrl;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-container">
        
        {/* Header */}
        <div className="contact-header">
          <div className="contact-badge">
            <HelpCircle size={16} />
            <span>Customer Inquiries & Support</span>
          </div>
          <h2 className="contact-title">
            Ask Us a <span className="highlight-text">Question</span>
          </h2>
          <p className="contact-subtitle">
            Have questions about ingredients, bulk catering, customized party boxes, or delivery areas in Madurai? Send us an inquiry below and we'll reply right away.
          </p>
        </div>

        {/* Main Content Grid: Info on Left, Inquiry Form on Right */}
        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-info-col">
            
            <div className="contact-card card-whatsapp">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Primary Kitchen Line</span>
                <a href="tel:9489443693" className="contact-link">
                  +91 94894 43693
                </a>
                <p className="card-hint">Call or WhatsApp for immediate help</p>
              </div>
            </div>

            <div className="contact-card card-phone">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Alternate Line</span>
                <a href="tel:9789231215" className="contact-link">
                  +91 97892 31215
                </a>
                <p className="card-hint">Quick questions & bulk event queries</p>
              </div>
            </div>

            <div className="contact-card card-location">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-card-text">
                <span className="card-label">Kitchen Location</span>
                <span className="contact-highlight-info">Madurai, Tamil Nadu</span>
                <p className="card-hint">Fresh home kitchen baked fresh daily</p>
              </div>
            </div>

            <div className="contact-card card-delivery">
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
              <span>Available 7 Days a Week • 9:00 AM – 9:00 PM</span>
            </div>

          </div>

          {/* Right Column: Inquiry Form Only */}
          <div className="contact-form-col">
            <div className="form-card">
              <div className="form-header">
                <h3>Send Us an Inquiry</h3>
                <p>Submit your question below. It will open in WhatsApp so we can answer you directly.</p>
              </div>

              <form onSubmit={handleInquirySubmit} className="order-form">
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-name">Your Name *</label>
                    <input 
                      type="text" 
                      id="inquiry-name" 
                      name="name" 
                      value={inquiryData.name} 
                      onChange={handleChange} 
                      placeholder="e.g. Priya Sharma"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inquiry-phone">Phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="inquiry-phone" 
                      name="phone" 
                      value={inquiryData.phone} 
                      onChange={handleChange} 
                      placeholder="e.g. 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-topic">Topic of Inquiry *</label>
                  <select id="inquiry-topic" name="topic" value={inquiryData.topic} onChange={handleChange}>
                    <option value="General Question">General Question</option>
                    <option value="Bulk Catering & Event Orders">Bulk Catering & Event Orders</option>
                    <option value="Custom Festive Gifting Hampers">Custom Festive Gifting Hampers</option>
                    <option value="Delivery Area & Pincode Check">Delivery Area & Pincode Check</option>
                    <option value="Allergy & Ingredient Question">Allergy & Ingredient Question</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-message">Your Question / Message *</label>
                  <textarea 
                    id="inquiry-message" 
                    name="message" 
                    rows="4" 
                    value={inquiryData.message} 
                    onChange={handleChange} 
                    placeholder="Ask us anything about our brownies, delivery timing, or custom orders..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-send-whatsapp">
                  <WhatsAppIcon size={18} color="#ffffff" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>

                {submitted && (
                  <div className="submit-feedback">
                    <CheckCircle2 size={16} color="#4ade80" />
                    <span>Inquiry sent! We will answer your question on WhatsApp shortly.</span>
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
            <a href="#menu">Signature Menu</a>
            <a href="#order">Quick Order</a>
            <a href="#offers">Offers</a>
            <a href="#why-us">Why Us</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-socials">
            <a href="https://www.instagram.com/zugar_zinger" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon social-ig">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon social-fb">
              <Facebook size={18} />
            </a>
            <a href="https://wa.me/919489443693" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon social-wa">
              <WhatsAppIcon size={18} color="currentColor" />
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
