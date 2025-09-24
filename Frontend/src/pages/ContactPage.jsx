import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactPage.css';

function ContactPage() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_e3javbm', 'template_f9rnt64', form.current, {
        publicKey: 'Nk06K-VxKVwUfjAEj',
      })
      .then(
        () => {
          setStatus('SUCCESS');
        },
        (error) => {
          setStatus('FAILED');
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div data-aos="fade-in" className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-form-header">
          <h1>Get in Touch</h1>
          <p>Have questions about our sneakers? We'd love to hear from you!</p>
        </div>

        <div className="contact-form-content">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="contact-input-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Message *</label>
              <textarea
                name="message"
                placeholder="Tell us how we can help you..."
                rows="5"
                required
              />
            </div>

            <button
              className="contact-submit-button"
              type="submit"
            >
              Send Message
            </button>
          </form>
          {status === 'SUCCESS' && (
            <div className="contact-success-message">
              <div className="contact-success-icon">✓</div>
              <p>Thank you! Your message has been sent.</p>
            </div>
          )}
          {status === 'FAILED' && (
            <div className="contact-error-message">
              <p>Failed to send message. Please try again.</p>
            </div>
          )}
        </div>

        <div className="contact-contact-info">
          <div className="contact-info-item">
            <span className="contact-icon">📧</span>
            <span>udaymishraa4@gmail.com</span>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon">📱</span>
            <span>+91 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;