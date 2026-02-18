import React, { useState } from 'react';
import { FiActivity, FiShield } from 'react-icons/fi'; // Icons for floating widgets
import styles from './DashboardPreview.module.css';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('lecturer');

  // Data for each view
  const content = {
    lecturer: {
      id: 'lecturer',
      label: 'Lecturer View',
      image: '/lecturers.jpg',
      title: 'Lecturer View',
      description: 'Class-level analytics, individual student risk scores, and one-click intervention recommendations.',
    },
    advisor: {
      id: 'advisor',
      label: 'Advisor Portal',
      image: '/advisor.jpg',
      title: 'Advisor Portal',
      description: 'Intervention tracking interface with student progress monitoring and action history.',
    },
    admin: {
      id: 'admin',
      label: 'Admin Control',
      image: '/admin.jpg',
      title: 'Admin Control',
      description: 'Institution-wide analytics and comprehensive reporting tools for strategic decisions.',
    }
  };

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.headerRow}>
          <div className={styles.titleColumn}>
            <h2 className={styles.headline}>
              Powerful Dashboards <br />
              For Every Stakeholder
            </h2>
          </div>
          <div className={styles.descColumn}>
            <p className={styles.description}>
              Role-based access ensures each user sees exactly 
              what they need - from classroom insights to 
              institution-wide analytics.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {Object.values(content).map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeBtn : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Display Area */}
        <div className={styles.displayContainer}>
          
          {/* Floating Widget Left */}
          <div className={`${styles.floatWidget} ${styles.widgetLeft}`}>
            <div className={`${styles.iconBox} ${styles.blueIcon}`}>
              <FiActivity />
            </div>
            <div className={styles.widgetText}>
              <strong>Real-time</strong>
              <span>Live Updates</span>
            </div>
          </div>

          {/* Floating Widget Right */}
          <div className={`${styles.floatWidget} ${styles.widgetRight}`}>
            <div className={`${styles.iconBox} ${styles.tealIcon}`}>
              <FiShield />
            </div>
            <div className={styles.widgetText}>
              <strong>Secure</strong>
              <span>Data Protected</span>
            </div>
          </div>

          {/* The Dashboard Image */}
          <div className={styles.imageWrapper}>
            <img 
              src={content[activeTab].image} 
              alt={content[activeTab].title} 
              className={styles.dashboardImage} 
            />
            
            {/* Bottom Gradient Overlay Text */}
            <div className={styles.textOverlay}>
              <h3 className={styles.overlayTitle}>{content[activeTab].title}</h3>
              <p className={styles.overlayDesc}>{content[activeTab].description}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;