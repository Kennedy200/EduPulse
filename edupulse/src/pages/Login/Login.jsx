import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast'; // Import Toast
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // The Toast Promise handles Loading, Success, and Error automatically
    const loginPromise = login(email, password);

    toast.promise(loginPromise, {
      loading: 'Verifying credentials...',
      success: 'Welcome back!',
      error: (err) => `${err.message}`, // Displays the error from AuthContext
    }).then(() => {
      // Only redirect if successful
      navigate('/dashboard');
    }).catch(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className={styles.pageWrapper}>
      
      <button onClick={() => navigate('/')} className={styles.backBtn}>
        <HiArrowNarrowLeft /> Back to Home
      </button>

      <div className={styles.loginCard}>
        <div className={styles.logoHeader}>
          <img src="/logo.png" alt="EduPulse" className={styles.logo} />
          <span className={styles.logoText}>EduPulse</span>
        </div>

        <h2 className={styles.welcomeText}>Welcome Back</h2>
        <p className={styles.subText}>Sign in to access your analytics dashboard.</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu.ng" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.forgotRow}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotLink}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className={styles.footer}>
          Don't have an account? <Link to="/signup" className={styles.registerLink}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;