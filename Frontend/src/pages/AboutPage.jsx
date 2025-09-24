import React from 'react';
import { Link } from 'react-router-dom';
import contentCards from '../data/contentCards';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

function AboutUs() {
  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Sneakers Sold' },
    { number: '500+', label: 'Rare Finds' },
    { number: '99.9%', label: 'Authentic Guarantee' }
  ];

  return (
    <div data-aos="fade-in" className="about-about-container">
      {/* Hero Section */}
      <div className="about-hero-section">
        <h1 className="about-hero-title">SNEAKHEAD</h1>
        <p className="about-hero-subtitle">
          Where passion meets sole. We're not just selling sneakers – we're curating a lifestyle for true sneaker enthusiasts.
        </p>
      </div>

      {/* Content Grid */}
      <div className="about-content-grid">
        {contentCards.map((card, index) => (
          <div key={index} className="about-content-card">
            <span className="about-sneaker-icon">{card.icon}</span>
            <h2 className="about-content-title">{card.title}</h2>
            {card.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="about-content-paragraph">{paragraph}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="about-stats-section">
        <h2 className="about-stats-title">Trusted by Sneakerheads Worldwide</h2>
        <div className="about-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="about-stat-item">
              <span className="about-stat-number">{stat.number}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta-section">
        <h2 className="about-cta-title">Ready to Step Up Your Game?</h2>
        <p className="about-cta-description">
          Discover your next favorite pair and join the Sneakhead community today.
        </p>
        <Link to="/shop" className="about-cta-button">Shop Collection</Link>        
      </div>
    </div>
  );
};

export default AboutUs;