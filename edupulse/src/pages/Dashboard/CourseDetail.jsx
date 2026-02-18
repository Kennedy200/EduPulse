import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { FiPlus, FiUpload, FiMail } from 'react-icons/fi';
import api from '../../api';
import toast from 'react-hot-toast';
import styles from './CourseDetail.module.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const [newStudent, setNewStudent] = useState({ full_name: '', matric_no: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performanceData, setPerformanceData] = useState({ attendance: '', test_score: '' });

  const fileInputRef = useRef(null);

  // Fetch Data
  const fetchCourseData = async () => {
    try {
      const response = await api.get(`/courses/${id}/`);
      setCourse(response.data);
      setStudents(response.data.students);
    } catch (error) {
      toast.error("Could not load course.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  // Add Student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/courses/${id}/add_student/`, newStudent);
      toast.success("Student added!");
      setShowAddModal(false);
      setNewStudent({ full_name: '', matric_no: '' });
      fetchCourseData();
    } catch (error) {
      toast.error("Failed to add student.");
    }
  };

  // Bulk Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const loadingToast = toast.loading('Analyzing CSV Data...');

    try {
      await api.post(`/courses/${id}/upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Analysis Complete!", { id: loadingToast });
      fetchCourseData();
    } catch (error) {
      toast.error("Upload Failed. Check CSV format.", { id: loadingToast });
    }
    e.target.value = null;
  };

  // Open Update Modal
  const openUpdateModal = (record) => {
    setSelectedStudent(record);
    setPerformanceData({
      attendance: record.attendance_score,
      test_score: record.test_score
    });
    setShowUpdateModal(true);
  };

  // Run Single Analysis
  const handleAnalysis = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Running Analysis...');
    try {
      await api.post(`/records/${selectedStudent.id}/update/`, performanceData);
      toast.success("Updated!", { id: loadingToast });
      setShowUpdateModal(false);
      fetchCourseData();
    } catch (error) {
      toast.error("Failed", { id: loadingToast });
    }
  };

  // Send Intervention Email
  const handleIntervention = async (recordId) => {
    const loadingToast = toast.loading('Sending Alert...');
    try {
      const response = await api.post(`/records/${recordId}/intervene/`);
      toast.success(response.data.message, { id: loadingToast });
    } catch (error) {
      toast.error("Failed to send email", { id: loadingToast });
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/dashboard/courses')} className={styles.backBtn}>
        <HiArrowNarrowLeft /> Back to Courses
      </button>

      <div className={styles.headerRow}>
        <div>
          <span className={styles.courseCode}>{course.code}</span>
          <h2 className={styles.courseTitle}>{course.title}</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="file" 
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".csv"
            onChange={handleFileUpload}
          />
          <button 
            className={styles.uploadBtn} 
            onClick={() => fileInputRef.current.click()}
          >
            <FiUpload /> Upload CSV
          </button>
          <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
            <FiPlus /> Add Student
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric No.</th>
              <th>Attendance</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="6" className={styles.emptyState}>No students yet.</td></tr>
            ) : (
              students.map((record) => (
                <tr key={record.id}>
                  <td className={styles.nameCell}>{record.student.full_name}</td>
                  <td>{record.student.matric_no}</td>
                  <td>{record.attendance_score}%</td>
                  <td>{record.test_score || '-'}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[record.risk_level]}`}>
                      {record.risk_level.toUpperCase()}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <button className={styles.updateBtn} onClick={() => openUpdateModal(record)}>
                      Update
                    </button>
                    {/* Show Email Button ONLY if Risk is NOT Green */}
                    {record.risk_level !== 'green' && (
                      <button 
                        className={styles.emailBtn}
                        onClick={() => handleIntervention(record.id)}
                        title="Send Intervention Email"
                      >
                        <FiMail />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" value={newStudent.full_name} onChange={(e) => setNewStudent({...newStudent, full_name: e.target.value})} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Matric No</label>
                <input type="text" value={newStudent.matric_no} onChange={(e) => setNewStudent({...newStudent, matric_no: e.target.value})} required />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddModal(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedStudent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Update Performance</h3>
            <form onSubmit={handleAnalysis}>
              <div className={styles.inputGroup}>
                <label>Attendance</label>
                <input type="number" min="0" max="100" value={performanceData.attendance} onChange={(e) => setPerformanceData({...performanceData, attendance: e.target.value})} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Test Score</label>
                <input type="number" min="0" max="100" value={performanceData.test_score} onChange={(e) => setPerformanceData({...performanceData, test_score: e.target.value})} required />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowUpdateModal(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.analyzeBtn}>Run Analysis</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;