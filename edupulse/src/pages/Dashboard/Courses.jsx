import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiBook, FiUsers, FiArrowRight } from 'react-icons/fi';
import api from '../../api'; 
import styles from './Courses.module.css';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading your courses...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>My Courses</h2>
          <p className={styles.subtitle}>Manage your classes and track student performance.</p>
        </div>
        <button 
          className={styles.addBtn} 
          onClick={() => navigate('/dashboard/courses/add')}
        >
          <FiPlus /> Add New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}><FiBook /></div>
          <h3>No courses found</h3>
          <p>You haven't created any courses yet.</p>
          <button className={styles.outlineBtn} onClick={() => navigate('/dashboard/courses/add')}>
            Create your first course
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}><FiBook /></div>
                <span className={styles.courseCode}>{course.code}</span>
              </div>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <div className={styles.cardFooter}>
                <div className={styles.studentCount}>
                  <FiUsers />
                  {/* REAL DATA FROM BACKEND */}
                  <span>{course.student_count} Students</span> 
                </div>
                <button className={styles.viewBtn} onClick={() => navigate(`/dashboard/courses/${course.id}`)}>
                  View Class <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;