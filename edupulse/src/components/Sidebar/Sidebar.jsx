import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiUsers, FiPieChart, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: 'Overview', path: '/dashboard', icon: <FiHome /> },
    { name: 'My Courses', path: '/dashboard/courses', icon: <FiBook /> },
    { name: 'Students', path: '/dashboard/students', icon: <FiUsers /> },
    { name: 'Risk Analysis', path: '/dashboard/analytics', icon: <FiPieChart /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings /> },
  ];

  // Helper to check active state (handles exact match for root /dashboard)
  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`} 
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        
        {/* Header: Logo & Close Button */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="EduPulse" className={styles.logo} />
            <span className={styles.logoText}>EduPulse</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <p className={styles.menuLabel}>MENU</p>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? `${styles.link} ${styles.active}` : styles.link}
              onClick={onClose} // Close sidebar on mobile when link clicked
            >
              <span className={styles.icon}>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer: Logout */}
        <div className={styles.footer}>
          <button className={styles.logoutBtn} onClick={logout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;