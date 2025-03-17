"use client"

import { useState, useRef, useEffect } from "react"
import { Scale, Menu, Send, X, Home, FileText, Mic, Plus } from "lucide-react"
// import {useNavigate} from "react-router-dom";
import gsap from "gsap"
import "./App.css"
import HeroAnimation from "./components/HeroAnimation"
import ChatMessage from "./components/ChatMessage"
import Sidebar from "./components/Sidebar"
import ThemeToggle from "./components/ThemeToggle"
import AboutPage from "./components/AboutPage"
import FeaturesPage from "./components/FeaturesPage"

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("contracts")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentPage, setCurrentPage] = useState("home")
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your AI legal assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  //state and handle submit function for login page
  const [loginFormData,setLoginFormData]=useState({
    email:"",
    password:""
  });

  const [signupFormData,setSignupFormData]=useState({
    email:"",
    password:"",
    username:"",
  });

  const [errorMessage,setErrorMessage]=useState("");
  var handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
  
      const data = await response.text();
  
      // ✅ Proper error handling
      if (!response.ok) {
        setErrorMessage("Invalid username or password!");
      }else{


        console.log(data);
      setLoginFormData({ email: "", password: "" });
  
      
      // localStorage.setItem("token", data.token);  // agar backend token bhej raha ho
  
      navigateTo("chat");
      }
  
      
    } catch (error) {
      setErrorMessage(error.message)
      console.log("Error:", error.message);
      alert("Login failed: " + error.message); 
    }
  };
  
  var handleSignupFormSubmit= async(e)=>{
e.preventDefault()
try{
const response= await fetch("http://localhost:8080/api/public/signup",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify(signupFormData)
})

const data= await response.text();
if(response.ok){
  console.log( data);
  setSignupFormData({username:"",email:"",password:""})
  //yha ham home page oe babus jayenge
}else{
  console.log("Signup failed!")
}

}catch(error){
console.log(error)
}


  }

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const particlesContainerRef = useRef(null)

  // Check theme on initial load
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
  }, [])

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class" && mutation.target === document.documentElement) {
          const isDark = document.documentElement.classList.contains("dark")
          setIsDarkMode(isDark)

          // Reinitialize particles when theme changes
          if (window.pJS && window.particlesJS) {
            window.pJS.fn.vendors.destroypJS()
            initializeParticles(isDark)
          }
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  // Initialize particles.js
  useEffect(() => {
    if (currentPage === "home") {
      loadParticlesJS()
    }

    return () => {
      // Clean up particles when component unmounts
      if (window.pJS && window.pJS.fn && window.pJS.fn.vendors) {
        window.pJS.fn.vendors.destroypJS()
      }
    }
  }, [currentPage])

  // Load particles.js from CDN
  const loadParticlesJS = () => {
    if (window.particlesJS) {
      initializeParticles(isDarkMode)
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
    script.async = true
    script.onload = () => initializeParticles(isDarkMode)
    document.body.appendChild(script)
  }

  // Initialize particles with the appropriate configuration
  const initializeParticles = (isDark) => {
    if (!window.particlesJS) return

    // Create container if it doesn't exist
    let container = document.getElementById("glitter-container")
    if (!container) {
      container = document.createElement("div")
      container.id = "glitter-container"
      container.style.position = "fixed"
      container.style.top = "0"
      container.style.left = "0"
      container.style.width = "100%"
      container.style.height = "100%"
      container.style.zIndex = "0"
      container.style.pointerEvents = "none"
      container.style.overflow = "hidden"

      // Insert at the beginning of the home container
      const homeContainer = document.querySelector(".home-container")
      if (homeContainer) {
        homeContainer.prepend(container)
      } else {
        document.body.prepend(container)
      }
    }

    // Configure particles
    window.particlesJS("glitter-container", {
      particles: {
        number: {
          value: 90, // Increased from 40 to 70
          density: {
            enable: true,
            value_area: 900, // Increased area for better spread
          },
        },
        color: {
          value: isDark
            ? ["#FFD700", "#FFC107", "#FFEB3B", "#F9A825"] // Brighter gold for dark mode
            : ["#D4AF37", "#CFB53B", "#C5B358", "#B8860B"], // Darker gold for light mode
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: isDark ? 0.7 : 0.8, // Increased for more visibility
          random: true,
          anim: {
            enable: true,
            speed: 1.5, // Slightly faster opacity animation
            opacity_min: 0.3,
            sync: false,
          },
        },
        size: {
          value: 4.5, // Increased size for more glow
          random: true,
          anim: {
            enable: true,
            speed: 3, // Faster size animation for more shimmer effect
            size_min: 1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 2.5, // Increased movement speed slightly
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 130, // Reduced distance for better clustering
            size: 6, // Bigger size when hovered
            duration: 2.5,
            opacity: 1, // Full opacity on hover
            speed: 3,
          },
          repulse: {
            distance: 180, // Reduced repulse distance for a subtle effect
            duration: 0.4,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (currentPage === "chat") {
      scrollToBottom()
    }
  }, [messages, currentPage])

  // GSAP animations for chat messages
  useEffect(() => {
    if (messages.length > 0 && currentPage === "chat") {
      gsap.fromTo(
        ".chat-message:last-child",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [messages, currentPage])

  // Handle sidebar toggle animation
  useEffect(() => {
    if (currentPage === "chat") {
      gsap.to(".sidebar", {
        x: isSidebarOpen ? "0%" : "-100%",
        duration: 0.3,
        ease: "power2.inOut",
      })

      gsap.to(".chat-container", {
        paddingLeft: isSidebarOpen ? "300px" : "0",
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [isSidebarOpen, currentPage])

  // Add this useEffect to handle mobile menu animation:
  useEffect(() => {
    const mobileMenu = document.querySelector(".mobile-menu")
    if (mobileMenu) {
      gsap.to(mobileMenu, {
        height: isMobileMenuOpen ? "auto" : "0",
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [isMobileMenuOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Find the navigateTo function and modify it to reset the mobile menu state when navigating
  const navigateTo = (page) => {
    setCurrentPage(page)
    // Reset mobile menu state when navigating
    setIsMobileMenuOpen(false)

    // Clean up particles when leaving home page
    if (page !== "home" && window.pJS && window.pJS.fn && window.pJS.fn.vendors) {
      window.pJS.fn.vendors.destroypJS()
    }

    // Initialize particles when going to home page
    if (page === "home") {
      setTimeout(() => {
        loadParticlesJS()
      }, 100)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  // Simple mock AI response function
  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("contract") || input.includes("agreement")) {
      return "Contracts typically require offer, acceptance, consideration, and legal purpose to be valid. I'd need more specific details about your contract situation to provide tailored guidance."
    } else if (input.includes("lawsuit") || input.includes("sue")) {
      return "Lawsuits involve complex procedures and timelines. The statute of limitations varies by case type and jurisdiction. Consider consulting with a licensed attorney for your specific situation."
    } else if (input.includes("divorce") || input.includes("custody")) {
      return "Family law matters like divorce and custody are governed by state laws. These proceedings typically involve property division, support determinations, and parenting arrangements."
    } else {
      return "Thank you for your question. To provide accurate legal information, I'd need more specific details about your situation. Please note that I can provide general legal information, but this doesn't constitute legal advice."
    }
  }

  const handleDocumentUpload = () => {
    document.getElementById("document-upload").click()
  }

  const handleFileSelected = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Create a new message to show the uploaded document
    const newMessage = {
      id: Date.now().toString(),
      content: `Uploaded document: ${file.name}`,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate processing
    setIsProcessing(true)

    // Simulate AI response after processing the document
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `I've analyzed the document "${file.name}". This appears to be a ${getDocumentType(file.name)}. Would you like me to summarize its key points or do you have specific questions about it?`,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 2000)

    // Reset the file input
    e.target.value = null
  }

  const getDocumentType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase()

    if (["doc", "docx"].includes(extension)) {
      return "Microsoft Word document"
    } else if (extension === "pdf") {
      return "PDF document"
    } else if (["jpg", "jpeg", "png"].includes(extension)) {
      return "image file"
    } else {
      return "text document"
    }
  }

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      startSpeechRecognition()
    } else {
      stopSpeechRecognition()
    }
  }

  const startSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setInput("Listening...")
      }

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInput(transcript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        setInput("")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()

      // Store the recognition instance to stop it later
      window.recognitionInstance = recognition
    } else {
      alert("Speech recognition is not supported in your browser. Please try Chrome or Edge.")
    }
  }

  const stopSpeechRecognition = () => {
    if (window.recognitionInstance) {
      window.recognitionInstance.stop()
    }
    setIsListening(false)
  }

  const getTemplatesByCategory = (category) => {
    const templates = {
      contracts: [
        { id: 1, name: "Employment Contract", type: "contract" },
        { id: 2, name: "Service Agreement", type: "contract" },
        { id: 3, name: "Non-Disclosure Agreement (NDA)", type: "contract" },
        { id: 4, name: "Lease Agreement", type: "contract" },
      ],
      legal: [
        { id: 5, name: "Power of Attorney", type: "legal" },
        { id: 6, name: "Last Will and Testament", type: "legal" },
        { id: 7, name: "Affidavit", type: "legal" },
        { id: 8, name: "Cease and Desist Letter", type: "legal" },
      ],
      business: [
        { id: 9, name: "LLC Operating Agreement", type: "business" },
        { id: 10, name: "Partnership Agreement", type: "business" },
        { id: 11, name: "Business Plan Template", type: "business" },
        { id: 12, name: "Invoice Template", type: "business" },
      ],
    }

    return templates[category] || []
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    setShowTemplateModal(false)

    // Create a new message to show the template request
    const newMessage = {
      id: Date.now().toString(),
      content: `I need a template for: ${template.name}`,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate processing
    setIsProcessing(true)

    // Simulate AI response with the template
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `Here's a template for "${template.name}". You can download it or I can help you customize it for your specific needs. Would you like me to explain any sections of this document?`,
        role: "assistant",
        isTemplate: true,
        templateName: template.name,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  // Render the home page
  const renderHomePage = () => {
    return (
      <div className="home-container">
        {/* Particles container will be added here dynamically */}
        <header className="header">
          <div className="logo">
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
          {/* Mobile menu button */}
          <div className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} className="menu-icon" /> : <Menu size={24} className="menu-icon" />}
          </div>
          <div className="header-actions">
            {/* Add ThemeToggle to header-actions */}
            <ThemeToggle />
            <button onClick={() => navigateTo("login")} className="btn btn-outline">
              Login
            </button>
            <button onClick={() => navigateTo("signup")} className="btn btn-outline btn-signup">
              Sign Up
            </button>
            <button onClick={() => navigateTo("chat")} className="btn btn-primary">
              Get Started
            </button>
          </div>
          <div className="mobile-menu">
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
              <li className="mobile-menu-divider"></li>
              {/* Add ThemeToggle to mobile menu */}
              <li className="mobile-theme-toggle">
                <ThemeToggle />
                <span>Toggle Theme</span>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("login")
                  }}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("signup")
                  }}
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("signup")
                  }}
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-content">
              <h1>Your AI-Powered Legal Assistant</h1>
              <h2>Get Instant Legal Guidance</h2>
              <p>
                Access professional legal advice instantly through our advanced AI system. Save time and money on
                routine legal questions.
              </p>
              <button onClick={() => navigateTo("signup")} className="btn btn-cta">
                Chat Now
              </button>
            </div>
            <div className="hero-animation">
              <HeroAnimation />
            </div>
          </section>
        </main>
      </div>
    )
  }

  // Render the login page
  const renderLoginPage = () => {



//     //logic to send the data to dababase
// const handleSubmit=(e)=>{
//   console.log(e);
// }

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <button className="back-button" onClick={() => navigateTo("home")}>
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            <div className="logo">
              <Scale className="logo-icon" />
              <span>LegalAI</span>
            </div>
          </div>

          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <form className="login-form" onSubmit={(e)=>{handleLoginSubmit(e)}}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={loginFormData.email} placeholder="your@email.com" onChange={(e)=>{setLoginFormData({...loginFormData,[e.target.name]:e.target.value})}} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" name="password" value={loginFormData.password} onChange={(e)=>{
                setLoginFormData({...loginFormData,[e.target.name]:e.target.value})

              }} />
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("signup")
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Add a renderSignupPage function after the renderLoginPage function
  const renderSignupPage = () => {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <button className="back-button" onClick={() => navigateTo("home")}>
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            <div className="logo">
              <Scale className="logo-icon" />
              <span>LegalAI</span>
            </div>
          </div>

          <h2>Create Account</h2>
          <p className="login-subtitle">Sign up for a new account</p>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="username" name="username" value={signupFormData.username} onChange={(e)=>{setSignupFormData({...signupFormData,[e.target.name]:e.target.value})}}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" name="email" value={signupFormData.email} onChange={(e)=>{setSignupFormData({...signupFormData,[e.target.name]:e.target.value})}} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" name="password" value={signupFormData.password} onChange={(e)=>{setSignupFormData({...signupFormData,[e.target.name]:e.target.value})}}/>
            </div>

            {/* <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password"  id="confirm-password" placeholder="••••••••" name="confirmPassword" value={signupFormData.confirmPassword}
              onChange={(e)=>{setSignupFormData({...signupFormData,[e.target.name]:e.target.value})}}/>
            </div> */}

            <button type="submit" className="btn btn-primary login-btn" onClick={handleSignupFormSubmit}>
              Create Account
            </button>
          </form>

          <div className="login-footer">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("login")
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render the chat page
  const renderChatPage = () => {
    return (
      <div className="chat-page">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="chat-container" ref={chatContainerRef}>
          <header className="chat-header">
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X /> : <Menu />}
            </button>

            <div className="logo">
              <Scale className="logo-icon" />
              <span>LegalAI</span>
            </div>

            <div className="header-actions">
              <button className="back-home-btn icon-only" onClick={() => navigateTo("home")} title="Home">
                <Home size={18} />
              </button>
              <ThemeToggle />
            </div>
          </header>

          <div className="messages-container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}

            {isProcessing && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <div className="chat-actions">
              <button
                type="button"
                className="action-button upload-button"
                onClick={handleDocumentUpload}
                title="Upload Document"
              >
                <FileText size={18} />
              </button>
              <button
                type="button"
                className={`action-button speak-button ${isListening ? "listening" : ""}`}
                onClick={toggleSpeechRecognition}
                title="Speak"
              >
                <Mic size={18} />
                {isListening && <span className="pulse-ring"></span>}
              </button>
              <button
                type="button"
                className="action-button template-button"
                onClick={() => setShowTemplateModal(true)}
                title="Get Document Template"
              >
                <FileText size={18} />
                <Plus size={12} className="plus-icon" />
              </button>
            </div>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your legal question here..."
                disabled={isProcessing || isListening}
              />
              <button type="submit" className="send-button" disabled={!input.trim() || isProcessing}>
                <Send />
              </button>
            </div>
          </form>
        </div>
        <input
          type="file"
          id="document-upload"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={handleFileSelected}
        />
        {showTemplateModal && (
          <div className="template-modal-overlay" onClick={() => setShowTemplateModal(false)}>
            <div className="template-modal" onClick={(e) => e.stopPropagation()}>
              <div className="template-modal-header">
                <h3>Select Document Template</h3>
                <button className="close-button" onClick={() => setShowTemplateModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="template-modal-content">
                <div className="template-categories">
                  <button
                    className={selectedCategory === "contracts" ? "active" : ""}
                    onClick={() => setSelectedCategory("contracts")}
                  >
                    Contracts
                  </button>
                  <button
                    className={selectedCategory === "legal" ? "active" : ""}
                    onClick={() => setSelectedCategory("legal")}>
                    Legal Forms
                  </button>
                  <button
                    className={selectedCategory === "business" ? "active" : ""}
                    onClick={() => setSelectedCategory("business")}
                  >
                    Business
                  </button>
                </div>
                <div className="template-list">
                  {getTemplatesByCategory(selectedCategory).map((template, index) => (
                    <div key={index} className="template-item" onClick={() => selectTemplate(template)}>
                      <FileText size={18} />
                      <span>{template.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app">
      {currentPage === "home" && renderHomePage()}
      {currentPage === "login" && renderLoginPage()}
      {currentPage === "signup" && renderSignupPage()}
      {currentPage === "chat" && renderChatPage()}
      {currentPage === "about" && <AboutPage navigateTo={navigateTo} />}
      {currentPage === "features" && <FeaturesPage navigateTo={navigateTo} />}
    </div>
  )
}

export default App

