import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.headerWrapper}>
      {/* Navbar Section */}
      <nav className={styles.navbar}>
        
        {/* Logo + Text */}
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="EduPulse Logo" className={styles.logoImage} />
          <span className={styles.logoText}>EduPulse</span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={styles.navLinks}>
          <li><a href="#platform" className={styles.navLinkItem}>Platform</a></li>
          <li><a href="#how-it-works" className={styles.navLinkItem}>How It Works</a></li>
          <li><a href="#pricing" className={styles.navLinkItem}>Pricing</a></li>
          <li><a href="#resources" className={styles.navLinkItem}>Resources</a></li>
        </ul>

        {/* Desktop Login Button */}
        <div className={styles.desktopAuth}>
          <button 
            className={styles.loginBtn} 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
          <FiMenu size={28} color="#0F172A" />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.showMenu : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="EduPulse Logo" className={styles.logoImage} />
            <span className={styles.logoText}>EduPulse</span>
          </div>
          <div className={styles.closeIcon} onClick={toggleMenu}>
            <FiX size={28} color="#0F172A" />
          </div>
        </div>

        <ul className={styles.mobileNavLinks}>
          <li><a href="#platform" onClick={toggleMenu}>Platform</a></li>
          <li><a href="#how-it-works" onClick={toggleMenu}>How It Works</a></li>
          <li><a href="#pricing" onClick={toggleMenu}>Pricing</a></li>
          <li><a href="#resources" onClick={toggleMenu}>Resources</a></li>
          <li>
            <button 
              className={styles.mobileLoginBtn}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            AI-POWERED EDTECH
          </div>
          
          <h1 className={styles.headline}>
            Stop Academic <br />
            Failure Before <br />
            It Starts
          </h1>
          
          <p className={styles.subheadline}>
            AI-driven predictive analytics that identifies at-risk students 
            6 weeks before failure - designed specifically for Nigerian universities.
          </p>
          
          <div className={styles.ctaGroup}>
            <button 
              className={styles.getStartedBtn}
              onClick={() => navigate('/signup')}
            >
              Get Started <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img src="/right-side.jpg" alt="EduPulse Risk Analysis Dashboard" />
        </div>
      </section>
    </header>
  );
};

export default Header;