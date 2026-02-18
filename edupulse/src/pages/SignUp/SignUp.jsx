import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast'; // Import Toast
import styles from './SignUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    role: 'lecturer',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const signupPromise = signup(formData);

    toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: 'Account created successfully!',
      error: (err) => `${err.message}`,
    }).then(() => {
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

      <div className={styles.cardWrapper}>
        <div className={styles.signupCard}>
          
          <div className={styles.logoHeader}>
            <img src="/logo.png" alt="EduPulse" className={styles.logo} />
            <span className={styles.logoText}>EduPulse</span>
          </div>

          <h2 className={styles.title}>Create your Account</h2>
          <p className={styles.subtitle}>Join the predictive education revolution.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Dr. Ada Obi" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="name@university.edu.ng" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Institution</label>
                <input 
                  type="text" 
                  name="institution" 
                  placeholder="UNILAG" 
                  required 
                  value={formData.institution}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Role</label>
                <div className={styles.selectWrapper}>
                  <select 
                    name="role" 
                    onChange={handleChange} 
                    className={styles.selectInput}
                    value={formData.role}
                  >
                    <option value="lecturer">Lecturer</option>
                    <option value="advisor">Academic Advisor</option>
                    <option value="admin">Administrator</option>
                    <option value="vc">Vice Chancellor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Create Account'}
            </button>
          </form>

          <div className={styles.footer}>
            Already have an account? <Link to="/login" className={styles.link}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;