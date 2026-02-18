import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import api from '../../api'; // Use our configured Axios instance
import toast from 'react-hot-toast';
import styles from './AddCourse.module.css';

const AddCourse = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    code: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send data to Django
      await api.post('/courses/', formData);
      toast.success('Course created successfully!');
      navigate('/dashboard/courses'); // Redirect to course list
    } catch (error) {
      console.error(error);
      toast.error('Failed to create course.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/dashboard')} className={styles.backBtn}>
        <HiArrowNarrowLeft /> Back to Dashboard
      </button>

      <div className={styles.formCard}>
        <h2 className={styles.title}>Add New Course</h2>
        <p className={styles.subtitle}>Create a new class to start tracking student performance.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Course Code</label>
            <input 
              type="text" 
              name="code" 
              placeholder="e.g. CSC 401" 
              value={formData.code}
              onChange={handleChange}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Course Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="e.g. Introduction to Artificial Intelligence" 
              value={formData.title}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;