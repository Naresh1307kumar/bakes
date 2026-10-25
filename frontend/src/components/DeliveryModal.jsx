import React, { useState } from 'react';
import { X, MapPin, Navigation, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './DeliveryModal.css';

export default function DeliveryModal({ isOpen, onClose, product, quantity = 1 }) {
  if (!isOpen || !product) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');

  const totalPrice = product.price * quantity;

  // Swiggy/Zomato style geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Location detection is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationCoords({ lat: latitude, lng: longitude });
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        setLocError('Could not fetch GPS location. Please type your Madurai address below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }

    const mapsLink = locationCoords 
      ? `https://maps.google.com/?q=${locationCoords.lat},${locationCoords.lng}`
      : 'Not provided (Address given above)';

    const text = encodeURIComponent(
      `*New Brownie Order - Zugar Zinger*\n\n` +
      `🍫 *Item:* ${product.name}\n` +
      `📦 *Quantity:* ${quantity} (${product.weight || 'Box'})\n` +
      `💰 *Total Amount:* ₹${totalPrice}\n\n` +
      `📍 *DELIVERY DETAILS (Swiggy/Zomato Style):*\n` +
      `👤 *Customer Name:* ${name.trim()}\n` +
      `📞 *Phone / WhatsApp:* ${phone.trim()}\n` +
      `🏠 *Delivery Address:* ${address.trim()}\n` +
      (landmark ? `🏢 *Landmark:* ${landmark.trim()}\n` : '') +
      (locationCoords ? `🗺️ *GPS Location Pin:* ${mapsLink}\n` : '') +
      `\n✅ Please confirm the order and delivery timeline. Thank you!`
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
    onClose();
  };

  return (
    <div className="delivery-modal-overlay" onClick={onClose}>
      <div className="delivery-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="swiggy-badge">
              <MapPin size={14} />
              <span>Doorstep Delivery • Madurai</span>
            </span>
            <h3>Delivery Details & Location</h3>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Selected Item Summary Pill */}
        <div className="modal-item-summary">
          <div className="summary-left">
            <span className="item-title">{product.name}</span>
            <span className="item-meta">{quantity} × ₹{product.price} ({product.weight})</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>

        {/* Delivery Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label htmlFor="modal-name">Full Name *</label>
              <input 
                type="text" 
                id="modal-name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. Anand Kumar"
                required
              />
            </div>
            <div className="modal-form-group">
              <label htmlFor="modal-phone">Phone / WhatsApp *</label>
              <input 
                type="tel" 
                id="modal-phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="e.g. 98765 43210"
                required
              />
            </div>
          </div>

          {/* Swiggy/Zomato style GPS Location Detector Button */}
          <div className="location-detector-box">
            <button 
              type="button" 
              className={`btn-detect-gps ${locationCoords ? 'detected' : ''}`}
              onClick={handleDetectLocation}
              disabled={locating}
            >
              <Navigation size={16} className={locating ? 'spin' : ''} />
              <span>
                {locating 
                  ? 'Fetching GPS Location...' 
                  : locationCoords 
                    ? '✓ GPS Location Captured' 
                    : '📍 Use My Current Location (GPS Pin)'}
              </span>
            </button>
            {locationCoords && (
              <span className="coords-text">Lat: {locationCoords.lat.toFixed(4)}, Lng: {locationCoords.lng.toFixed(4)}</span>
            )}
            {locError && <span className="loc-error-text">{locError}</span>}
          </div>

          <div className="modal-form-group">
            <label htmlFor="modal-address">Complete Delivery Address *</label>
            <textarea 
              id="modal-address" 
              rows="3" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Flat/House No., Street Name, Area in Madurai (e.g. Anna Nagar, KK Nagar, etc.)"
              required
            ></textarea>
          </div>

          <div className="modal-form-group">
            <label htmlFor="modal-landmark">Nearby Landmark (Optional)</label>
            <input 
              type="text" 
              id="modal-landmark" 
              value={landmark} 
              onChange={(e) => setLandmark(e.target.value)} 
              placeholder="e.g. Near Meenakshi Temple / Opposite Apollo Hospital"
            />
          </div>

          {/* Confirmation Notice */}
          <div className="modal-confirm-alert">
            <CheckCircle2 size={16} color="#4ade80" />
            <span>Once placed, our kitchen sends an official confirmation message on WhatsApp.</span>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-modal-submit">
            <WhatsAppIcon size={18} color="#ffffff" />
            <span>Confirm & Place Order (₹{totalPrice})</span>
          </button>

        </form>

      </div>
    </div>
  );
}
