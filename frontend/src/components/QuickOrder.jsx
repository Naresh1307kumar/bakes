import React, { useState } from 'react';
import { ShoppingBag, MapPin, Navigation, CheckCircle2, Phone, Clock } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './QuickOrder.css';

const ORDER_ITEMS = [
  { name: 'Special Dream Cake with Toppers (1/2 KG) — ₹500', price: 500 },
  { name: 'Brownie Slab 1/2kg (Heart Anniversary Special) — ₹500', price: 500 },
  { name: 'Premium Brownie Hamper (Customized) — ₹400', price: 400 },
  { name: 'Birthday Rocher Brownie Cake — ₹1000', price: 1000 },
  { name: 'Chocolate Dream Cake Mini — ₹150', price: 150 },
  { name: 'Dream Cake Mini Rasamalai — ₹300', price: 300 },
  { name: 'Classic Brownies Pack (5 pcs) — ₹225', price: 225 },
  { name: 'Mini Bytes Snack Pack — ₹120', price: 120 },
  { name: 'Plum Cake Rich Loaf — ₹350', price: 350 },
  { name: 'Freshly Baked Cookies Pack — ₹180', price: 180 },
  { name: 'Cupcakes Box — ₹150', price: 150 },
  { name: 'Assorted Handcrafted Chocolates — ₹250', price: 250 }
];

export default function QuickOrder() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItem, setSelectedItem] = useState(ORDER_ITEMS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Find price of selected item
  const itemObj = ORDER_ITEMS.find(i => i.name === selectedItem) || ORDER_ITEMS[0];
  const subtotal = itemObj.price * quantity;
  // Apply bulk discount if applicable (5% for >=5, 10% for >=10)
  let discount = 0;
  if (quantity >= 10) discount = subtotal * 0.10;
  else if (quantity >= 5) discount = subtotal * 0.05;
  const finalTotal = Math.round(subtotal - discount);

  // Swiggy/Zomato style Geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Location detection is not supported by your device browser.');
      return;
    }
    setLocating(true);
    setLocError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocationCoords({ lat: latitude, lng: longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setLocError('Could not fetch GPS coordinates. Please enter your address manually below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out your Name, Phone Number, and Delivery Address.');
      return;
    }

    const mapsLink = locationCoords 
      ? `https://maps.google.com/?q=${locationCoords.lat},${locationCoords.lng}`
      : 'Not provided (Detailed address given above)';

    const discountText = discount > 0 ? `\n🎁 *Bulk Discount Applied:* -₹${Math.round(discount)}` : '';

    const text = encodeURIComponent(
      `*New Brownie Order - Zugar Zinger*\n\n` +
      `🍫 *Selected Item:* ${selectedItem}\n` +
      `📦 *Quantity:* ${quantity} Box(es)\n` +
      `💰 *Total Amount:* ₹${finalTotal}${discountText}\n\n` +
      `📍 *DELIVERY DETAILS (Swiggy / Zomato Style):*\n` +
      `👤 *Customer Name:* ${name.trim()}\n` +
      `📞 *Phone / WhatsApp:* ${phone.trim()}\n` +
      `🏠 *Delivery Address:* ${address.trim()}\n` +
      (landmark ? `🏢 *Landmark:* ${landmark.trim()}\n` : '') +
      (locationCoords ? `🗺️ *GPS Location Pin:* ${mapsLink}\n` : '') +
      `\n✅ Please confirm the order and provide the estimated delivery time. Thank you!`
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
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="order" className="quick-order-section">
      <div className="quick-order-container">
        
        {/* Section Header */}
        <div className="quick-order-header">
          <div className="order-badge">
            <ShoppingBag size={16} />
            <span>Doorstep Delivery Across Madurai</span>
          </div>
          <h2 className="order-title">
            Quick <span className="highlight-text">Online Order</span>
          </h2>
          <p className="order-subtitle">
            Order fresh brownie slabs & combo boxes in seconds. Enter your delivery address with GPS location pin (Swiggy & Zomato style) for fast door delivery.
          </p>
        </div>

        {/* Order Card Container */}
        <div className="order-card-wrapper">
          <form onSubmit={handleOrderSubmit} className="quick-order-form">
            
            {/* Step 1: Contact Details */}
            <div className="form-section-title">
              <span className="step-num">1</span>
              <h4>Contact & Delivery Info</h4>
            </div>

            <div className="order-row">
              <div className="order-input-group">
                <label htmlFor="customer-name">Your Full Name *</label>
                <input 
                  type="text" 
                  id="customer-name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Priya Sharma" 
                  required 
                />
              </div>
              <div className="order-input-group">
                <label htmlFor="customer-phone">Phone / WhatsApp Number *</label>
                <input 
                  type="tel" 
                  id="customer-phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="e.g. 98765 43210" 
                  required 
                />
              </div>
            </div>

            {/* Step 2: Item & Quantity Selection */}
            <div className="form-section-title">
              <span className="step-num">2</span>
              <h4>Select Brownie Flavor & Quantity</h4>
            </div>

            <div className="order-row">
              <div className="order-input-group">
                <label htmlFor="order-item">Choose Brownie / Combo *</label>
                <select 
                  id="order-item" 
                  value={selectedItem} 
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  {ORDER_ITEMS.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name} — ₹{item.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="order-input-group">
                <label htmlFor="order-qty">Quantity (Boxes / Slabs) *</label>
                <select 
                  id="order-qty" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  <option value={1}>1 Box (₹{itemObj.price})</option>
                  <option value={2}>2 Boxes (₹{itemObj.price * 2})</option>
                  <option value={3}>3 Boxes (₹{itemObj.price * 3})</option>
                  <option value={4}>4 Boxes (₹{itemObj.price * 4})</option>
                  <option value={5}>5 Boxes (5% Discount applied)</option>
                  <option value={10}>10+ Boxes (10% Discount applied)</option>
                </select>
              </div>
            </div>

            {/* Price Preview Strip */}
            <div className="order-pricing-strip">
              <div className="strip-item">
                <span>Selected:</span>
                <strong>{selectedItem}</strong>
              </div>
              <div className="strip-item">
                <span>Total to Pay:</span>
                <strong className="price-tag">₹{finalTotal}</strong>
                {discount > 0 && <span className="discount-tag">(Saved ₹{Math.round(discount)}!)</span>}
              </div>
            </div>

            {/* Step 3: Address & GPS Location Pin (Swiggy / Zomato style) */}
            <div className="form-section-title">
              <span className="step-num">3</span>
              <h4>Delivery Address & Location (Madurai)</h4>
            </div>

            {/* GPS Location Detector Button */}
            <div className="gps-location-bar">
              <button 
                type="button" 
                className={`btn-gps-detect ${locationCoords ? 'active' : ''}`}
                onClick={handleDetectLocation}
                disabled={locating}
              >
                <Navigation size={17} className={locating ? 'spin' : ''} />
                <span>
                  {locating 
                    ? 'Detecting GPS location...' 
                    : locationCoords 
                      ? '✓ GPS Location Attached' 
                      : '📍 Use My Current Location (GPS Pin for Delivery Driver)'}
                </span>
              </button>
              {locationCoords && (
                <span className="gps-badge">Location captured successfully</span>
              )}
              {locError && <span className="gps-error">{locError}</span>}
            </div>

            <div className="order-input-group">
              <label htmlFor="delivery-address">House / Flat No., Street, Area in Madurai *</label>
              <textarea 
                id="delivery-address" 
                rows="3" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="e.g. Door No. 12, 3rd Cross Street, KK Nagar, Madurai - 625020" 
                required 
              ></textarea>
            </div>

            <div className="order-input-group">
              <label htmlFor="delivery-landmark">Nearby Landmark (Optional)</label>
              <input 
                type="text" 
                id="delivery-landmark" 
                value={landmark} 
                onChange={(e) => setLandmark(e.target.value)} 
                placeholder="e.g. Opposite State Bank of India / Near Mattuthavani Bus Stand" 
              />
            </div>

            {/* Confirmation Note */}
            <div className="order-confirm-box">
              <CheckCircle2 size={18} color="#4ade80" />
              <p>
                <strong>Order Confirmation:</strong> Once you place this order, our kitchen will send an instant confirmation message on WhatsApp with your invoice and live delivery arrival time.
              </p>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-place-order-main">
              <WhatsAppIcon size={20} color="#ffffff" />
              <span>Confirm & Place Order via WhatsApp (₹{finalTotal})</span>
            </button>

            {submitted && (
              <div className="order-success-pill">
                <CheckCircle2 size={16} color="#4ade80" />
                <span>Order sent! You will receive your confirmation message on WhatsApp.</span>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
