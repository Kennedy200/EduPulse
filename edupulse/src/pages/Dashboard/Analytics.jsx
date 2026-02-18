import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import api from '../../api'; 
import styles from './Analytics.module.css';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/analytics/');
        setPieData(response.data.pie_data);
        setBarData(response.data.bar_data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div style={{padding: '2rem'}}>Loading analytics...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Institutional Risk Analysis</h2>
      <p className={styles.subtitle}>Overview of student performance trends across all courses.</p>
      
      <div className={styles.grid}>
        {/* Pie Chart */}
        <div className={styles.card}>
          <h3>Overall Risk Distribution</h3>
          {pieData.reduce((acc, curr) => acc + curr.value, 0) === 0 ? (
            <p className={styles.emptyText}>No student data available yet.</p>
          ) : (
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Bar Chart */}
        <div className={styles.card}>
          <h3>High Risk Students per Course</h3>
          {barData.length === 0 ? (
             <p className={styles.emptyText}>No courses created yet.</p>
          ) : (
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="risk" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={40} name="Critical Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;