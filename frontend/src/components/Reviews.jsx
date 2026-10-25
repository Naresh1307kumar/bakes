import React from 'react';
import { Star, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import './Reviews.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'K.K. Nagar, Madurai',
    rating: 5,
    tag: 'Verified Order',
    text: 'The fudgiest brownies I’ve ever had in Madurai! The Nutella slab is an absolute dream — so rich, dense, and fresh from the oven.',
    date: 'Recent Order'
  },
  {
    id: 2,
    name: 'Karthik M.',
    location: 'Anna Nagar, Madurai',
    rating: 5,
    tag: 'Bulk Event Order',
    text: 'Ordered 10 boxes for our family anniversary celebration. Everyone loved the classic slabs and the festive gift packaging was simply stunning!',
    date: 'Celebration Favors'
  },
  {
    id: 3,
    name: 'Ananya V.',
    location: 'SS Colony, Madurai',
    rating: 5,
    tag: 'Repeat Customer',
    text: 'Pure chocolate decadence loaded with crunchy roasted nuts. Prompt door delivery across Madurai and the taste is 10/10. My go-to for gifting!',
    date: 'Gift Box Order'
  },
  {
    id: 4,
    name: 'Divya R.',
    location: 'Villapuram, Madurai',
    rating: 5,
    tag: 'Verified Order',
    text: 'The shiny crinkly crust and melt-in-the-mouth center are bakery-level perfection. Hands down the best homemade brownies in town.',
    date: 'Weekend Treat'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        
        {/* Header */}
        <div className="reviews-header">
          <div className="reviews-badge">
            <MessageSquareHeart size={16} />
            <span>Customer Love & Reviews</span>
          </div>
          <h2 className="reviews-title">
            What Brownie Lovers Say
          </h2>
          <p className="reviews-subtitle">
            Real experiences from chocolate lovers, families, and gift-givers across Madurai.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              
              <div className="review-card-top">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <span className="review-tag">{review.tag}</span>
              </div>

              <p className="review-quote">
                "{review.text}"
              </p>

              <div className="review-author-row">
                <div className="author-avatar">
                  {review.name.charAt(0)}
                </div>
                <div className="author-details">
                  <h4 className="author-name">{review.name}</h4>
                  <span className="author-location">{review.location}</span>
                </div>
                <div className="verified-badge">
                  <CheckCircle2 size={15} />
                  <span>Verified</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
