"use client"

import { Scale, Home, Brain, FileSearch, Shield, FileText, Check, X, Moon } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useEffect, useState } from "react"
import gsap from "gsap"

function FeaturesPage({ navigateTo }) {
  const [activeTab, setActiveTab] = useState(0)
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    // Animate sections on page load
    gsap.fromTo(
      ".features-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
    )

    // Animate feature cards
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      },
    )
  }, [])

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How accurate is the AI legal assistant?",
      answer:
        "Our AI is trained on extensive legal databases and continuously updated with the latest legal information. While it provides highly accurate information for general legal queries, it's designed to assist, not replace, professional legal advice for complex situations.",
    },
    {
      question: "Is my data secure when I use the platform?",
      answer:
        "Yes, we employ end-to-end encryption and strict data protection protocols. Your documents and queries are encrypted, and we have a clear privacy policy that prohibits sharing your information with third parties without consent.",
    },
    {
      question: "Can I use the document templates for official purposes?",
      answer:
        "Yes, our templates are designed for official use and follow standard legal formats. However, we recommend reviewing any document with a legal professional before using it for significant legal matters.",
    },
    {
      question: "How does the OCR document scanning work?",
      answer:
        "Simply upload your document (PDF, image) to our platform. Our OCR technology will scan the document, extract the text, and analyze it. You can then search within the document, get summaries, or ask questions about its content.",
    },
    {
      question: "Do I need a subscription to use all features?",
      answer:
        "We offer both free and premium tiers. Basic legal information and limited document analysis are available for free, while advanced features like unlimited document scanning, template access, and priority support require a subscription.",
    },
  ]

  return (
    <div className="features-page">
      <header className="header">
        <div className="logo" onClick={() => navigateTo("home")} style={{ cursor: "pointer" }}>
          <Scale className="logo-icon" />
          <span>LegalAI</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li className="active">
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
            <li>
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

      <main className="features-content">
        {/* Hero Section */}
        <section className="features-hero features-section">
          <div className="features-hero-content">
            <h1>Powerful Features for Legal Assistance</h1>
            <p className="features-subtitle">
              Discover how our AI-powered platform simplifies legal processes and provides expert guidance
            </p>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="features-grid-section features-section">
          <div className="section-container">
            <h2>Comprehensive Legal Tools</h2>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Brain size={32} />
                </div>
                <h3>AI-Powered Legal Assistance</h3>
                <ul className="feature-list">
                  <li>NLP Integration: Analyze and extract key insights from legal documents</li>
                  <li>Context-Aware Search: Get smarter legal recommendations based on queries</li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FileSearch size={32} />
                </div>
                <h3>Optical Character Recognition (OCR)</h3>
                <ul className="feature-list">
                  <li>Extract Text from Images/PDFs: Scan legal documents and convert them into editable text</li>
                  <li>Accuracy Optimized for Legal Docs: Handles complex legal formatting</li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FileText size={32} />
                </div>
                <h3>Smart Legal Document Management</h3>
                <ul className="feature-list">
                  <li>Upload & Categorize Files: Save and organize legal documents effortlessly</li>
                  <li>Text Summarization: Get concise summaries of lengthy contracts</li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Check size={32} />
                </div>
                <h3>Ready-to-Use Legal Document Templates</h3>
                <ul className="feature-list">
                  <li>Wide Range of Templates: Access contracts, agreements, and other legal documents</li>
                  <li>Customizable Forms: Edit and personalize templates as per your needs</li>
                  <li>Legally Vetted Content: Templates created with standard legal structures in mind</li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Moon size={32} />
                </div>
                <h3>User-Friendly Experience</h3>
                <ul className="feature-list">
                  <li>Dark Mode & Theme Toggle: Customize the UI for better readability</li>
                  <li>Intuitive Dashboard: A simple interface designed for legal professionals</li>
                </ul>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={32} />
                </div>
                <h3>Security & Authentication</h3>
                <ul className="feature-list">
                  <li>Role-Based Access Control: Different access levels for users</li>
                  <li>End-to-End Encryption: Ensuring data privacy and security</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="comparison-section features-section">
          <div className="section-container">
            <h2>AI vs. Traditional Legal Processes</h2>
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>LegalAI Platform</th>
                    <th>Traditional Legal Process</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Response Time</td>
                    <td>Instant (seconds)</td>
                    <td>Days to weeks</td>
                  </tr>
                  <tr>
                    <td>Cost</td>
                    <td>Affordable subscription</td>
                    <td>$150-500+ per hour</td>
                  </tr>
                  <tr>
                    <td>Availability</td>
                    <td>24/7 access</td>
                    <td>Limited office hours</td>
                  </tr>
                  <tr>
                    <td>Document Analysis</td>
                    <td>Automated, minutes</td>
                    <td>Manual, hours to days</td>
                  </tr>
                  <tr>
                    <td>Legal Research</td>
                    <td>AI-powered, comprehensive</td>
                    <td>Time-intensive, limited scope</td>
                  </tr>
                  <tr>
                    <td>Template Access</td>
                    <td>Hundreds of templates</td>
                    <td>Limited, often custom-created</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section features-section">
          <div className="section-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeFaq === index ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-toggle">{activeFaq === index ? <X size={18} /> : <Plus size={18} />}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section features-section">
          <div className="section-container">
            <h2>Ready to Experience LegalAI?</h2>
            <p>Start using our AI-powered legal assistant today and simplify your legal processes</p>
            <div className="cta-buttons">
              <button onClick={() => navigateTo("signup")} className="btn btn-cta">
                Try It Now
              </button>
              <button onClick={() => navigateTo("about")} className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="features-footer">
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

// Plus icon component
function Plus(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

export default FeaturesPage

