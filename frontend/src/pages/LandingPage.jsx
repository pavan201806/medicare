import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Landing Page
 * Clean hero section with value proposition and primary CTA
 * Professional healthcare design with subtle animations
 */
const LandingPage = () => {
  return (
    <div className="bg-soft">
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Your Trusted AI Medical Assistant
              </h1>
              <p className="hero-subtitle">
                Get instant medical guidance, medicine information, and appointment assistance 
                with our advanced AI-powered healthcare platform. Designed for your peace of mind.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/assistant" className="btn btn-primary btn-lg">
                  Talk to Assistant
                </Link>
                <Link to="/medicine" className="btn btn-secondary btn-lg">
                  Medicine Info
                </Link>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="hero-illustration-placeholder">
                👨‍⚕️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">How We Help You</h2>
            <p className="text-muted text-large">
              Comprehensive healthcare assistance at your fingertips
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3 icon-feature">💬</div>
                  <h4 className="card-title">AI Medical Chat</h4>
                  <p className="card-text">
                    Have natural conversations with our AI medical assistant. 
                    Get guidance on symptoms, health questions, and medical information.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3 icon-feature">💊</div>
                  <h4 className="card-title">Medicine Information</h4>
                  <p className="card-text">
                    Search and learn about medicines, their usage, precautions, 
                    and important information to help you make informed decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="mb-3 icon-feature">📅</div>
                  <h4 className="card-title">Appointment Assistance</h4>
                  <p className="card-text">
                    Find the right doctor for your needs and schedule appointments 
                    with ease through our streamlined booking system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-soft">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Your Health, Our Priority</h2>
              <p className="text-large margin-bottom-large">
                We understand that healthcare decisions are important. Our AI assistant 
                is designed to provide helpful information while always reminding you to 
                consult with qualified healthcare professionals for medical advice.
              </p>
              <ul className="text-feature-list">
                <li>24/7 Available Assistance</li>
                <li>Privacy-Focused Design</li>
                <li>Accessible for All Ages</li>
                <li>Professional Healthcare Standards</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <div className="card shadow-soft trust-card">
                <div className="icon-large mb-3">🛡️</div>
                <h4>Secure & Private</h4>
                <p className="text-muted">
                  Your health information is handled with the utmost care and security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage


