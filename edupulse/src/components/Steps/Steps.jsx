import React from 'react';
import { FaDatabase, FaBrain } from 'react-icons/fa';
import { HiOutlineBell } from 'react-icons/hi';
import styles from './Steps.module.css';

const Steps = () => {
  return (
    <section className={styles.sectionWrapper}>
      
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <span className={styles.badge}>SIMPLE INTEGRATION</span>
        <h2 className={styles.headline}>
          Three Steps to Predictive <br /> Success
        </h2>
      </div>

      <div className={styles.cardsContainer}>
        
        {/* Step 01 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox}>
              <FaDatabase />
            </div>
          </div>
          
          <h3 className={styles.cardTitle}>Connect Your Systems</h3>
          <p className={styles.cardDescription}>
            Seamlessly integrate with your existing student information system, LMS, and attendance platforms. No disruption to current workflows.
          </p>
          
          <div className={styles.tagsContainer}>
            <span className={styles.tag}>Moodle</span>
            <span className={styles.tag}>Canvas</span>
            <span className={styles.tag}>Custom SIS</span>
          </div>
        </div>

        {/* Step 02 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox}>
              <FaBrain />
            </div>
          </div>
          
          <h3 className={styles.cardTitle}>AI Processes Everything</h3>
          <p className={styles.cardDescription}>
            Our machine learning models analyze attendance patterns, grade trajectories, engagement metrics, and behavioral indicators in real-time.
          </p>
          
          <div className={styles.processingIndicator}>
            <span className={styles.dots}>•••</span> Processing data...
          </div>
        </div>

        {/* Step 03 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox}>
              <HiOutlineBell />
            </div>
          </div>
          
          <h3 className={styles.cardTitle}>Receive Smart Interventions</h3>
          <p className={styles.cardDescription}>
            Get prioritized alerts with AI-generated intervention suggestions tailored to each student's specific risk factors and context.
          </p>
          
          <div className={styles.alertBox}>
            <div className={styles.alertDot}></div>
            <div className={styles.alertText}>
              <strong>High Risk Alert</strong><br />
              Student ID: 2024/CS/001
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Steps;