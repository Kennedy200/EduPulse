import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';
import styles from './Topbar.module.css';

const Topbar = ({ onToggleSidebar, title }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Role Mapping (vc -> Vice Chancellor)
  const roleMapping = {
    'vc': 'Vice Chancellor',
    'admin': 'Administrator',
    'lecturer': 'Lecturer',
    'advisor': 'Academic Advisor'
  };

  const displayRole = user?.role ? (roleMapping[user.role] || user.role) : 'User';

  // 2. Profile Picture (Using UI Avatars service for "Gmail style" look)
  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=0F172A&color=fff&bold=true`;

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar}>
          <FiMenu />
        </button>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <FiBell />
          <span className={styles.badge}>2</span>
        </button>
        
        {/* 3. Clickable Profile Section */}
        <div 
          className={styles.profile} 
          onClick={() => navigate('/dashboard/settings')} // Redirects to settings
          title="Edit Profile"
        >
          <img 
            src={avatarUrl} 
            alt="Profile" 
            className={styles.avatarImage} 
          />
          <div className={styles.userInfo}>
            <span className={styles.name}>{user?.full_name || 'User'}</span>
            <span className={styles.role}>{displayRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;