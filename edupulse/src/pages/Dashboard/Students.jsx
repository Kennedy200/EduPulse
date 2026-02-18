import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import api from '../../api';
import styles from './Students.module.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students/');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter logic for search
  const filteredStudents = students.filter(student => 
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matric_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Student Directory</h2>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name or matric no..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>Loading directory...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Matric No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className={styles.nameCell}>
                      <div className={styles.avatar}>
                        <FiUser />
                      </div>
                      {student.full_name}
                    </td>
                    <td>{student.matric_no}</td>
                    <td><span className={styles.activeBadge}>Active</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className={styles.empty}>No students found matching your search.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Students;