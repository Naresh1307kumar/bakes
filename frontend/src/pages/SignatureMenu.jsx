import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Phone, Check, Award, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import DeliveryModal from '../components/DeliveryModal';
import './SignatureMenu.css';

const ALL_PRODUCTS = [
  // 1. Dream Cakes (from Zugar Zinger Catalogue)
  {
    id: 1,
    category: 'dreamcakes',
    name: 'Special Dream Cake with Toppers',
    price: 500,
    weight: '1/2 KG & 1 KG Available',
    image: '/assets/images/dream_cake_toppers.jpg',
    tag: 'Bestseller',
    description: 'Our famous 5-layer decadent chocolate dream cake in a premium tin, finished with customized cake toppers for birthdays & anniversaries.',
    highlights: ['5 Decadent Layers', 'Custom Topper Included', 'Available in 1/2kg & 1kg']
  },
  {
    id: 2,
    category: 'dreamcakes',
    name: 'Chocolate Dream Cake Mini',
    price: 150,
    weight: 'Mini Tub (Min. Order ₹300)',
    image: '/assets/images/dream_cake_mini.jpg',
    tag: 'Trending Mini',
    description: 'Individual mini tub of decadent chocolate dream cake with molten chocolate ganache and premium cocoa dusting.',
    highlights: ['Molten Chocolate Ganache', 'Rich Sponge Layer', 'Minimum Order Value ₹300']
  },
  {
    id: 3,
    category: 'dreamcakes',
    name: 'Dream Cake Mini Rasamalai (Customized)',
    price: 300,
    weight: 'Mini Fusion Tub',
    image: '/assets/images/dream_cake_rasamalai.jpg',
    tag: 'Fusion Special',
    description: 'Unique Indian fusion dessert combining authentic rasamalai milk infusion, soft sponge, and rich cream layer. Custom varieties available.',
    highlights: ['Real Rasamalai Infusion', 'Saffron Cream Layer', 'Customization Available']
  },

  // 2. Brownies & Slabs (from Zugar Zinger Catalogue)
  {
    id: 4,
    category: 'brownies',
    name: 'Premium Brownie Hamper (Customized)',
    price: 400,
    weight: 'Customized Box',
    image: '/assets/images/brownie_hamper.jpg',
    tag: 'Popular Hamper',
    description: 'Assorted brownie box customized with premium toppings including KitKat, Oreo, chocolate chips, and roasted walnuts.',
    highlights: ['KitKat & Oreo Toppings', 'Roasted Crunchy Nuts', 'Special Discounts Available']
  },
  {
    id: 5,
    category: 'brownies',
    name: 'Classic Brownies',
    price: 45,
    weight: '₹45/pc (Min. 5 pieces for delivery)',
    image: '/assets/images/classic_brownies_stack.jpg',
    tag: 'Artisanal Classic',
    description: 'Traditional rich fudge brownies baked with pure cocoa and real dairy butter, featuring our signature glossy crinkly top crust.',
    highlights: ['Pure Cocoa & Dairy Butter', 'Glossy Crinkly Crust', 'Minimum 5 Pcs for Delivery (₹225)']
  },
  {
    id: 6,
    category: 'brownies',
    name: 'Brownie Slab 1/2kg (Heart Shape Anniversary Special)',
    price: 500,
    weight: '1/2 KG Heart Slab',
    image: '/assets/images/heart_brownie_slab.jpg',
    tag: 'Anniversary Special',
    description: 'Heart-shaped decadent brownie slab decorated with golden pearl beads and a custom golden heart centerpiece. Perfect for anniversaries & romance.',
    highlights: ['Special Heart Shape', 'Golden Pearl Toppings', 'Anniversary Greeting Tag']
  },
  {
    id: 7,
    category: 'brownies',
    name: 'Birthday Rocher Brownie Cake',
    price: 1000,
    weight: 'Celebration Luxury Cake',
    image: '/assets/images/birthday_rocher_brownie.jpg',
    tag: 'Celebration Luxury',
    description: 'Grand celebratory brownie cake topped with authentic Ferrero Rocher truffles, golden sprinkles, chocolate drip, and personalized Birthday topper.',
    highlights: ['Ferrero Rocher Loaded', 'Golden Drip Ganache', 'Custom Birthday Topper Included']
  },
  {
    id: 14,
    category: 'brownies',
    name: 'Custom Celebration Brownie Slab',
    price: 550,
    weight: '1/2 KG Custom Message Slab',
    image: '/assets/images/mom_dad_brownie_slab.jpg',
    tag: 'Personalized Special',
    description: 'Custom message brownie slab iced with piped greetings ("MOM DAD", Names, Anniversaries), glossy chocolate waves, and edible pearls.',
    highlights: ['Custom Name & Message', 'Golden Pearl Accents', 'Rich Chocolate Swirls']
  },
  {
    id: 15,
    category: 'brownies',
    name: 'Nutella Brownies Box',
    price: 250,
    weight: 'Takeaway Box of 4',
    image: '/assets/images/nutella_brownies.jpg',
    tag: 'Nutella Loaded',
    description: 'Rich fudgy brownies generously iced with original Nutella chocolate hazelnut spread, white chocolate chips, and rainbow sprinkles.',
    highlights: ['100% Nutella Glaze', 'White Chocolate Drops', 'Takeaway Ready Box']
  },

  // 3. Mini Bytes & Bites (from Zugar Zinger Catalogue)
  {
    id: 8,
    category: 'snacks',
    name: 'Mini Bytes',
    price: 120,
    weight: 'Pack of Bars (Min. Order ₹350)',
    image: '/assets/images/mini_bytes.jpg',
    tag: 'Snack Favorite',
    description: 'Bite-sized nutty chocolate brownie fingers dipped in creamy milk chocolate and coated generously with roasted nuts.',
    highlights: ['Roasted Nutty Coating', 'Fudgy Brownie Fingers', 'Minimum Order Value ₹350']
  },
  {
    id: 9,
    category: 'snacks',
    name: 'Plum Cakes',
    price: 350,
    weight: 'Rich Fruit Loaf',
    image: '/assets/images/plum_cake.jpg',
    tag: 'Festive Special',
    description: 'Traditional spiced plum cake enriched with slow-soaked dried fruits, cashews, and aromatic spices. Price may differ with current offers.',
    highlights: ['Slow Soaked Fruits', 'Rich Festive Spices', 'DM for Current Offers']
  },
  {
    id: 10,
    category: 'snacks',
    name: 'Brownie with Vanilla Ice Cream',
    price: 120,
    weight: 'Dine/Takeaway Dessert Special',
    image: '/assets/images/brownie_ice_cream.jpg',
    tag: 'Dessert Special',
    description: 'Warm fudgy chocolate brownie paired with chilled vanilla ice cream and hot chocolate fudge syrup drizzle.',
    highlights: ['Hot Sizzling Brownie', 'Creamy Vanilla Scoop', 'Chocolate Fudge Drizzle']
  },
  {
    id: 11,
    category: 'snacks',
    name: 'Freshly Baked Cookies',
    price: 180,
    weight: 'Pack of Artisan Cookies',
    image: '/assets/images/cookies.jpg',
    tag: '100% Butter Baked',
    description: 'Crispy edges with a soft-baked chewy center, loaded with chocolate chunks and baked fresh with dairy butter.',
    highlights: ['Loaded Choco Chunks', '100% Pure Butter', 'Freshly Baked Daily']
  },
  {
    id: 12,
    category: 'snacks',
    name: 'Cupcakes Box',
    price: 150,
    weight: 'Pack of Cupcakes',
    image: '/assets/images/cupcakes.jpg',
    tag: 'Party Favorite',
    description: 'Soft, spongy cupcakes frosted with silky chocolate and vanilla buttercream. Great for kids parties and celebrations.',
    highlights: ['Buttercream Swirl', 'Soft & Spongy', 'Great for Parties']
  },
  {
    id: 13,
    category: 'snacks',
    name: 'Assorted Handcrafted Chocolates',
    price: 250,
    weight: 'Artisan Gifting Box',
    image: '/assets/images/assorted_chocolates.jpg',
    tag: 'Gifting Box',
    description: 'Handmade artisan chocolates with dark, milk, and nutty fillings, gift-boxed for festivals and celebrations.',
    highlights: ['Assorted Fillings', 'Gift Wrapped Box', 'Pure Artisan Chocolate']
  }
];

export default function SignatureMenu() {
  const [activeTab, setActiveTab] = useState('all');
  const [quantities, setQuantities] = useState(() => {
    const init = {};
    ALL_PRODUCTS.forEach(p => {
      // For classic brownies (id=5), default quantity is 5 pieces (₹225)
      init[p.id] = p.id === 5 ? 5 : 1;
    });
    return init;
  });
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const minQty = id === 5 ? 5 : 1; // Minimum 5 for single brownies
      const step = id === 5 ? (delta > 0 ? 5 : -5) : delta;
      return {
        ...prev,
        [id]: Math.max(minQty, (prev[id] || minQty) + step)
      };
    });
  };

  const filteredProducts = activeTab === 'all' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeTab);

  return (
    <div className="menu-page-root">
      
      {/* Clean Standalone Header */}
      <header className="standalone-menu-nav">
        <div className="standalone-nav-container">
          
          <div className="standalone-nav-left">
            <Link to="/" className="btn-back-to-home" title="Return to home page">
              <ArrowLeft size={16} />
              <span className="back-text-desktop">Back to Home</span>
              <span className="back-text-mobile">Home</span>
            </Link>
          </div>

          <div className="standalone-nav-center">
            <Link to="/" className="standalone-brand">
              <span className="brand-icon">✨</span>
              <span className="brand-text">Zugar Zinger</span>
            </Link>
            <span className="standalone-tag">Official Menu</span>
          </div>

          <div className="standalone-nav-right">
            <div className="standalone-delivery-badge">
              <MapPin size={15} color="#e5a93c" />
              <span>Door Delivery in Madurai</span>
            </div>
            <a href="tel:9489443693" className="btn-standalone-call" aria-label="Call kitchen">
              <Phone size={15} />
              <span className="call-text-desktop">Call: 94894 43693</span>
              <span className="call-text-mobile">Call</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="menu-page-main">
        <div className="menu-container">

          {/* Page Header */}
          <div className="menu-header">
            <div className="menu-badge">
              <Sparkles size={15} />
              <span>Zugar Zinger Bakehouse</span>
            </div>
            <h1 className="menu-title">
              Our Complete <span className="highlight-text">Menu & Delights</span>
            </h1>
            <p className="menu-subtitle">
              Handcrafted Dream Cakes, signature Brownie Slabs, Mini Bytes, and celebration gift hampers delivered across Madurai.
            </p>
          </div>

          {/* Order Confirmation Assurance Banner */}
          <div className="order-confirmation-banner">
            <CheckCircle2 size={18} color="#4ade80" className="banner-confirm-icon" />
            <p>
              <strong>Order Confirmation:</strong> Once placed, you will receive an official confirmation message on WhatsApp with your invoice and live delivery arrival time.
            </p>
          </div>

          {/* Filter Categories Tabs */}
          <div className="menu-filter-tabs">
            <button 
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Items ({ALL_PRODUCTS.length})
            </button>
            <button 
              className={`filter-tab ${activeTab === 'dreamcakes' ? 'active' : ''}`}
              onClick={() => setActiveTab('dreamcakes')}
            >
              Dream Cakes (3)
            </button>
            <button 
              className={`filter-tab ${activeTab === 'brownies' ? 'active' : ''}`}
              onClick={() => setActiveTab('brownies')}
            >
              Brownies & Slabs (4)
            </button>
            <button 
              className={`filter-tab ${activeTab === 'snacks' ? 'active' : ''}`}
              onClick={() => setActiveTab('snacks')}
            >
              Mini Bytes & Treats (6)
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || (product.id === 5 ? 5 : 1);
              const totalPrice = product.price * qty;

              return (
                <div key={product.id} className="product-slab-card">
                  
                  {/* Image Container with Tag */}
                  <div className="product-img-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-tag-chip">
                      {product.tag}
                    </div>
                    <div className="product-weight-chip">
                      {product.weight}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="product-card-body">
                    <div className="product-name-row">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">
                        <span className="currency">₹</span>
                        <span className="amount">{product.price}</span>
                        {product.id === 5 && <span className="price-unit">/pc</span>}
                      </div>
                    </div>

                    <p className="product-desc">{product.description}</p>

                    {/* Highlights bullet points */}
                    <div className="product-highlights">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="highlight-tag">
                          <Check size={14} color="#e5a93c" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Controls */}
                    <div className="product-order-controls">
                      
                      {/* Quantity Selector */}
                      <div className="quantity-box">
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-number">{qty}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Swiggy/Zomato style Order Trigger Button */}
                      <button 
                        type="button"
                        onClick={() => setActiveModalProduct(product)}
                        className="btn-order-slab"
                      >
                        <MessageSquare size={16} />
                        <span>Order (₹{totalPrice})</span>
                      </button>

                    </div>

                    {/* Delivery prompt hint */}
                    <p className="card-confirm-hint">
                      ✓ Enter address & location pin for door delivery
                    </p>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Custom Gifting Box Callout */}
          <div className="menu-custom-callout">
            <div className="callout-left">
              <Award size={36} color="#e5a93c" />
              <div>
                <h3>Need Custom Party Orders or Event Platters?</h3>
                <p>We customize gift boxes with personalized ribbons and greeting notes for birthdays, anniversaries, and corporate events across Madurai.</p>
              </div>
            </div>
            <div className="callout-actions">
              <a href="tel:9489443693" className="btn-callout-call">
                <Phone size={16} />
                <span>Call Kitchen: 94894 43693</span>
              </a>
              <a 
                href="https://wa.me/919489443693?text=Hi%20Zugar%20Zinger,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20order!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-callout-call secondary-callout"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Kitchen</span>
              </a>
            </div>
          </div>

          {/* Swiggy/Zomato Delivery Address Modal */}
          <DeliveryModal 
            isOpen={!!activeModalProduct}
            onClose={() => setActiveModalProduct(null)}
            product={activeModalProduct}
            quantity={activeModalProduct ? quantities[activeModalProduct.id] || 1 : 1}
          />

        </div>
      </main>

      {/* Clean Standalone Footer */}
      <footer className="standalone-menu-footer">
        <p>© {new Date().getFullYear()} Zugar Zinger Bakehouse • Handcrafted in Madurai • Door Delivery Available</p>
      </footer>

    </div>
  );
}
