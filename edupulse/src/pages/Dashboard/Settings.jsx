import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Settings.module.css';

const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account Settings</h2>
      
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className={styles.name}>{user?.full_name}</h3>
            <p className={styles.role}>{user?.role?.toUpperCase()}</p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.formGrid}>
          <div className={styles.section}>
            <label>Full Name</label>
            <input type="text" value={user?.full_name || ''} disabled className={styles.input} />
          </div>
          <div className={styles.section}>
            <label>Email Address</label>
            <input type="email" value={user?.email || ''} disabled className={styles.input} />
          </div>
          <div className={styles.section}>
            <label>Institution</label>
            <input type="text" value={user?.institution || ''} disabled className={styles.input} />
          </div>
          <div className={styles.section}>
            <label>Role</label>
            <input type="text" value={user?.role?.toUpperCase() || ''} disabled className={styles.input} />
          </div>
        </div>
        
        <button className={styles.logoutBtn} onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Settings;