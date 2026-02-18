import React from 'react';
import { FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa'; // Social Icons
import { HiOutlineMail, HiPhone, HiLocationMarker } from 'react-icons/hi'; // Contact Icons
import styles from './Footer.module.css';

const Footer = () => {
  const preventAction = (e) => e.preventDefault();

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.container}>
        
        {/* TOP SECTION: 3 Columns */}
        <div className={styles.topSection}>
          
          {/* Column 1: Brand Info */}
          <div className={styles.brandColumn}>
            <div className={styles.logoContainer}>
              <img src="/logo.png" alt="EduPulse" className={styles.logoImage} />
              <span className={styles.logoText}>EduPulse</span>
            </div>
            
            <p className={styles.description}>
              AI-Powered Academic Success Platform designed specifically for 
              Nigerian universities to predict and prevent student failure.
            </p>
            
            <p className={styles.description}>
              Transforming education through predictive intelligence and 
              data-driven interventions.
            </p>

            <div className={styles.socialRow}>
              <a href="#" onClick={preventAction} className={styles.socialIcon}>
                <FaLinkedinIn />
              </a>
              <a href="#" onClick={preventAction} className={styles.socialIcon}>
                <FaTwitter /> {/* Representing X */}
              </a>
              <a href="#" onClick={preventAction} className={styles.socialIcon}>
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>PLATFORM</h4>
            <ul className={styles.linkList}>
              <li><a href="#" onClick={preventAction}>How It Works</a></li>
              <li><a href="#" onClick={preventAction}>Features</a></li>
              <li><a href="#" onClick={preventAction}>Pricing</a></li>
              <li><a href="#" onClick={preventAction}>Case Studies</a></li>
              <li><a href="#" onClick={preventAction}>API Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={styles.contactColumn}>
            <h4 className={styles.columnTitle}>CONTACT</h4>
            <ul className={styles.contactList}>
              <li>
                <HiOutlineMail className={styles.icon} />
                <a href="#" onClick={preventAction}>hello@edupulse.ng</a>
              </li>
              <li>
                <HiPhone className={styles.icon} />
                <a href="#" onClick={preventAction}>+234 xxx xxxx xxx</a>
              </li>
              <li>
                <HiLocationMarker className={styles.icon} />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>

            <button className={styles.outlineBtn} onClick={preventAction}>
              Request Demo
            </button>
          </div>

        </div>

        {/* DIVIDER LINE */}
        <div className={styles.divider}></div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; 2025 EduPulse. Built for Nigerian Universities.
          </div>
          
          <div className={styles.legalLinks}>
            <a href="#" onClick={preventAction}>Privacy Policy</a>
            <a href="#" onClick={preventAction}>Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;