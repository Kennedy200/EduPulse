import React from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { HiOutlineChip, HiOutlineClock, HiOutlineCursorClick, HiOutlineLightBulb } from 'react-icons/hi';
import styles from './Comparison.module.css';

const Comparison = () => {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        
        {/* Left Card: Reactive Approach */}
        <div className={styles.reactiveCard}>
          <div className={styles.iconWrapperRed}>
            <FiX className={styles.redIcon} />
          </div>
          
          <h3 className={styles.cardTitleRed}>Reactive Approach</h3>
          
          <ul className={styles.redList}>
            <li>Manual attendance sheets</li>
            <li>Grade reports after exams</li>
            <li>Intervention when already failing</li>
            <li>No behavioral insights</li>
          </ul>
        </div>

        {/* Right Card: Predictive Intelligence */}
        <div className={styles.predictiveCard}>
          <div className={styles.iconWrapperTeal}>
            <FiCheck className={styles.whiteIcon} />
          </div>

          <h3 className={styles.cardTitleDark}>Predictive Intelligence</h3>

          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <HiOutlineChip />
              </div>
              <span>Multi-dimensional data analysis</span>
            </li>

            <li className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <HiOutlineClock />
              </div>
              <span>6-week early warning system</span>
            </li>

            <li className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <HiOutlineCursorClick />
              </div>
              <span>Automated intervention triggers</span>
            </li>

            <li className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <HiOutlineLightBulb />
              </div>
              <span>Behavioral pattern recognition</span>
            </li>
          </ul>

          <div className={styles.accuracyBadge}>
            <strong>94%</strong> Prediction Accuracy
          </div>
        </div>

      </div>
    </section>
  );
};

export default Comparison;