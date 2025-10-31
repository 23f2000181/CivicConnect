import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero" aria-label="Hero">
        <div className="container">
          <h1 className="hero-title">Your voice for better neighborhoods</h1>
          <p className="hero-sub">Report civic issues, track progress, and work with local authorities to keep streets safe, clean, and well-maintained.</p>

          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/report" className="primary-btn">Report an Issue</Link>
            ) : (
              <Link to="/register" className="primary-btn">Create a free account</Link>
            )}
            <Link to="/issues" className="secondary-btn">Browse community reports</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" aria-label="What you can do">
        <div className="container">
          <h2 className="section-title">What you can do with CivicConnect</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h4l2-2h4l2 2h4v12H4V7z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="feature-title">Submit detailed reports</h3>
              <p className="feature-desc">Add locations and descriptions for issues like potholes, broken lights, or sanitation problems.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v3" />
                  <path d="M12 18v3" />
                  <path d="M3 12h3" />
                  <path d="M18 12h3" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <h3 className="feature-title">Track status in real‑time</h3>
              <p className="feature-desc">Follow each report from submission to resolution with transparent updates.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
                  <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                </svg>
              </div>
              <h3 className="feature-title">Mobilize your community</h3>
              <p className="feature-desc">Upvote and discuss local issues to help prioritize what matters most.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Fast and easy to use</h3>
              <p className="feature-desc">Clean design, no clutter—report an issue in seconds from any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="features" aria-label="How it works">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <h3 className="feature-title">1. Create</h3>
              <p className="feature-desc">Open an issue with a title, description, and location.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12h16" />
                </svg>
              </div>
              <h3 className="feature-title">2. Share</h3>
              <p className="feature-desc">Engage neighbors to upvote and comment for visibility.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="feature-title">3. Resolve</h3>
              <p className="feature-desc">Work with authorities and track updates until it's fixed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="features" aria-label="Get started">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to improve your community?</h2>
          <div className="hero-cta" style={{ marginTop: '0.5rem' }}>
            {isAuthenticated ? (
              <Link to="/report" className="primary-btn">Start a new report</Link>
            ) : (
              <>
                <Link to="/register" className="primary-btn">Create an account</Link>
                <Link to="/login" className="secondary-btn">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;