import React from 'react';
import { HiOutlineShieldCheck, HiArrowNarrowRight } from 'react-icons/hi';
import { FiHeadphones, FiZap } from 'react-icons/fi'; // Icons for Support and Speed
import styles from './Contact.module.css';

const Contact = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload/routing as requested
    console.log("Form submitted (Frontend Only)");
  };

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* LEFT COLUMN: Text & Features */}
        <div className={styles.leftColumn}>
          <span className={styles.badge}>GET STARTED TODAY</span>
          
          <h2 className={styles.headline}>
            Ready to Predict <br />
            Success Before <br />
            Failure Happens?
          </h2>
          
          <p className={styles.subheadline}>
            Join 12 Nigerian universities already using EduPulse 
            to transform student outcomes.
          </p>

          {/* Feature List */}
          <div className={styles.featuresList}>
            
            {/* Feature 1 */}
            <div className={styles.featureItem}>
              <div className={styles.iconBox}>
                <HiOutlineShieldCheck />
              </div>
              <div className={styles.featureText}>
                <strong>Data Security Guaranteed</strong>
                <span>NDPR compliant & encrypted</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureItem}>
              <div className={`${styles.iconBox} ${styles.iconBlue}`}>
                <FiHeadphones />
              </div>
              <div className={styles.featureText}>
                <strong>Dedicated Support</strong>
                <span>Local team available 24/7</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureItem}>
              <div className={styles.iconBox}>
                <FiZap />
              </div>
              <div className={styles.featureText}>
                <strong>Quick Setup</strong>
                <span>Live in 2 weeks or less</span>
              </div>
            </div>

          </div>

          {/* Trusted By Section */}
          <div className={styles.trustSection}>
            <p className={styles.trustLabel}>Trusted by leading Institutions</p>
            <div className={styles.trustLogos}>
              <span>University of Lagos</span>
              <span>Covenant University</span>
              <span>NOUN</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className={styles.rightColumn}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Request a Demo</h3>
            <p className={styles.formSubtitle}>
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className={styles.inputGroup}>
                <label>Full Name *</label>
                <input type="text" placeholder="Dr. John Doe" />
              </div>

              {/* Email */}
              <div className={styles.inputGroup}>
                <label>Email Address *</label>
                <input type="email" placeholder="john.doe@university.edu.ng" />
              </div>

              {/* Institution */}
              <div className={styles.inputGroup}>
                <label>Institution Name *</label>
                <input type="text" placeholder="University of Lagos" />
              </div>

              {/* Role Select */}
              <div className={styles.inputGroup}>
                <label>Your Role *</label>
                <select defaultValue="">
                  <option value="" disabled>Select your role</option>
                  <option value="vc">Vice Chancellor</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">IT Administrator</option>
                  <option value="advisor">Academic Advisor</option>
                </select>
              </div>

              {/* Phone */}
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+234 xxx xxxx xxx" />
              </div>

              {/* Additional Info */}
              <div className={styles.inputGroup}>
                <label>Additional Information</label>
                <textarea 
                  rows="4" 
                  placeholder="Tell us about your institution's needs... (max 500 characters)"
                ></textarea>
                <span className={styles.charCount}>0/500</span>
              </div>

              {/* Button */}
              <button type="submit" className={styles.submitBtn}>
                Request Demo <HiArrowNarrowRight className={styles.arrowIcon} />
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;