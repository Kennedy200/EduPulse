import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs'; // Solid check circle icon
import styles from './Testimonial.module.css';

const Testimonial = () => {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Top Badge */}
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>
            <span className={styles.ngCode}>NG</span> Built for Nigerian Universities
          </span>
        </div>

        {/* Main Text (Quotes removed as requested) */}
        <h2 className={styles.quoteText}>
          The Nigerian academic context requires solutions 
          that understand our unique challenges - large 
          class sizes, infrastructure constraints, and diverse 
          student backgrounds.
        </h2>

        {/* Author */}
        <div className={styles.authorContainer}>
          <p className={styles.authorName}>Dr. Adebayo Okonkwo</p>
          <p className={styles.authorTitle}>Vice-Chancellor, Federal University</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {/* Card 1 */}
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>500K+</h3>
            <p className={styles.statLabel}>Students Monitored</p>
          </div>

          {/* Card 2 */}
          <div className={styles.statCard}>
            <h3 className={`${styles.statValue} ${styles.blueAccent}`}>94%</h3>
            <p className={styles.statLabel}>Prediction Accuracy</p>
          </div>

          {/* Card 3 */}
          <div className={styles.statCard}>
            <h3 className={styles.statValue}>6 Weeks</h3>
            <p className={styles.statLabel}>Early Detection</p>
          </div>
        </div>

        {/* Feature List (2 Columns) */}
        <div className={styles.featuresContainer}>
          <div className={styles.featureColumn}>
            <div className={styles.featureItem}>
              <BsFillCheckCircleFill className={styles.checkIcon} />
              <span>JAMB score integration</span>
            </div>
            <div className={styles.featureItem}>
              <BsFillCheckCircleFill className={styles.checkIcon} />
              <span>Multi-language support (English, Yoruba, Hausa, Igbo)</span>
            </div>
          </div>

          <div className={styles.featureColumn}>
            <div className={styles.featureItem}>
              <BsFillCheckCircleFill className={styles.checkIcon} />
              <span>Low-bandwidth optimization</span>
            </div>
            <div className={styles.featureItem}>
              <BsFillCheckCircleFill className={styles.checkIcon} />
              <span>Offline-capable mobile app</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;