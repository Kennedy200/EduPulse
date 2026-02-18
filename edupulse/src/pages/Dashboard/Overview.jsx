import React, { useState, useEffect } from 'react';
import { FiUsers, FiBookOpen, FiAlertTriangle, FiPlus } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Import your API instance
import styles from './Overview.module.css';

const Overview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State for real data
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    atRisk: 0
  });
  
  const [chartData, setChartData] = useState([]);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We can re-use the analytics endpoint we built earlier
        // Or create a specific dashboard-stats endpoint. 
        // For simplicity, let's hit /analytics/ which gives us most of what we need
        // and /courses/ for course count.
        
        const [analyticsRes, coursesRes, studentsRes] = await Promise.all([
          api.get('/analytics/'),
          api.get('/courses/'),
          api.get('/students/')
        ]);

        const pieData = analyticsRes.data.pie_data;
        
        // Calculate totals
        const totalStudents = studentsRes.data.length;
        const activeCourses = coursesRes.data.length;
        
        // Find "Critical" (Red) count from pie data
        const criticalData = pieData.find(d => d.name === 'Critical');
        const atRiskCount = criticalData ? criticalData.value : 0;

        setStats({
          totalStudents,
          activeCourses,
          atRisk: atRiskCount
        });

        setChartData(pieData);

      } catch (error) {
        console.error("Error fetching overview data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // UI Components for Stats Cards
  const statsConfig = [
    { label: 'Total Students', value: stats.totalStudents, icon: <FiUsers />, color: 'blue' },
    { label: 'Active Courses', value: stats.activeCourses, icon: <FiBookOpen />, color: 'teal' },
    { label: 'At Risk', value: stats.atRisk, icon: <FiAlertTriangle />, color: 'red' },
  ];

  if (loading) return <div style={{padding:'2rem'}}>Loading dashboard...</div>;

  return (
    <div className={styles.container}>
      
      {/* Header Row */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.welcome}>Overview</h2>
          <p className={styles.date}>Today, {new Date().toLocaleDateString()}</p>
        </div>
        <button className={styles.addBtn}
          onClick={() => navigate('/dashboard/courses/add')} 
        >
          <FiPlus /> Add New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {statsConfig.map((stat, index) => (
          <div key={index} className={styles.card}>
            <div className={`${styles.iconBox} ${styles[stat.color]}`}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className={styles.contentGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Student Risk Distribution</h3>
          
          {/* Check if chart data is empty */}
          {chartData.reduce((a, b) => a + b.value, 0) === 0 ? (
            <p style={{textAlign: 'center', color: '#94A3B8', padding: '2rem'}}>No data available yet.</p>
          ) : (
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {chartData.map((item) => (
                  <div key={item.name} className={styles.legendItem}>
                    <span className={styles.dot} style={{ backgroundColor: item.color }}></span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;