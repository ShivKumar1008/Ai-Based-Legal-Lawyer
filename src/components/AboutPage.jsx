"use client"

import { Scale, Home, ArrowRight, Brain, FileSearch, Shield, Search, Zap } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useEffect } from "react"
import gsap from "gsap"

function AboutPage({ navigateTo }) {
  useEffect(() => {
    // Animate sections on page load
    gsap.fromTo(
      ".about-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
    )

    // Animate icons
    gsap.fromTo(
      ".feature-icon",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      },
    )
  }, [])

  return (
    <div className="about-page">
      <header className="header">
        <div className="logo" onClick={() => navigateTo("home")} style={{ cursor: "pointer" }}>
          <Scale className="logo-icon" />
          <span>LegalAI</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("features")
                }}
              >
                Features
              </a>
            </li>
            <li className="active">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("about")
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("home")
                }}
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="back-home-btn icon-only mobile-hide" onClick={() => navigateTo("home")} title="Home">
            <Home size={18} />
          </button>
          <ThemeToggle />
          <button onClick={() => navigateTo("chat")} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </header>
      <main className="about-content">
        {/* Hero Section */}
        <section className="about-hero about-section">
          <div className="about-hero-content">
            <h1>Simplifying Legal Processes with AI</h1>
            <p className="mission-statement">
              Our mission is to democratize legal assistance through cutting-edge artificial intelligence, making legal
              guidance accessible, affordable, and understandable for everyone.
            </p>
            <button onClick={() => navigateTo("signup")} className="btn btn-cta mt-6">
              Experience LegalAI <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="who-we-are about-section">
          <div className="section-container">
            <h2>Who We Are</h2>
            <div className="content-wrapper">
              <div className="text-content">
                <p>
                  LegalAI was founded by a team of legal professionals and AI specialists who recognized the challenges
                  many people face when navigating complex legal systems. We believe that everyone deserves access to
                  quality legal information without the prohibitive costs.
                </p>
                <p>
                  Our platform combines advanced artificial intelligence with legal expertise to provide instant,
                  accurate guidance on a wide range of legal topics. We're committed to simplifying legal processes and
                  empowering individuals and businesses to make informed decisions.
                </p>
              </div>
              <div className="image-placeholder">
                <div className="team-image">
                  <img src="" alt="hamari image"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works about-section">
          <div className="section-container">
            <h2>How It Works</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Brain size={32} />
                </div>
                <h3>Natural Language Processing</h3>
                <p>
                  Our AI uses advanced NLP to understand legal queries in plain language, analyze legal documents, and
                  extract key information without requiring legal jargon.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FileSearch size={32} />
                </div>
                <h3>Document Scanning (OCR)</h3>
                <p>
                  Upload legal documents and our OCR technology will scan, extract, and analyze the text, making it easy
                  to understand complex legal paperwork.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Search size={32} />
                </div>
                <h3>Smart Legal Search</h3>
                <p>
                  Our AI-powered search understands context and legal concepts, providing relevant information and
                  guidance based on your specific situation.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={32} />
                </div>
                <h3>Secure & Private</h3>
                <p>
                  Your legal information is sensitive. We use end-to-end encryption and strict data protection protocols
                  to ensure your information remains confidential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Features Section */}
        <section className="updated-features about-section">
          <div className="section-container">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>
                <Zap className="feature-list-icon" />
                <span>
                  <strong>AI-Powered Legal Assistance</strong> – Get instant insights using advanced NLP for legal text
                  analysis.
                </span>
              </li>
              <li>
                <FileSearch className="feature-list-icon" />
                <span>
                  <strong>Document Scanning (OCR)</strong> – Upload and extract text from legal documents effortlessly.
                </span>
              </li>
              <li>
                <Shield className="feature-list-icon" />
                <span>
                  <strong>User Authentication</strong> – Secure login & registration with role-based access.
                </span>
              </li>
              <li>
                <ThemeToggle className="feature-list-icon" />
                <span>
                  <strong>Theme Toggle</strong> – Switch between light & dark mode for better user experience.
                </span>
              </li>
              <li>
                <Search className="feature-list-icon" />
                <span>
                  <strong>Smart Search & Navigation</strong> – Easily find relevant legal information.
                </span>
              </li>
              <li>
                <Zap className="feature-list-icon" />
                <span>
                  <strong>Interactive UI</strong> – Smooth, user-friendly interface built with React.
                </span>
              </li>
              <li>
                <Shield className="feature-list-icon" />
                <span>
                  <strong>Secure Data Handling</strong> – Your legal data remains encrypted and protected.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Scale className="logo-icon" />
            <span>LegalAI</span>
          </div>
          <p>© 2023 LegalAI. All rights reserved.</p>
          <p>
            <small>
              Disclaimer: LegalAI provides legal information, not legal advice. For specific legal advice, please
              consult with a qualified attorney.
            </small>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage

