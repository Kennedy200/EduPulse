import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import styles from './Dashboard.module.css';

// Import Real Pages
import Overview from './Overview';
import Courses from './Courses';
import AddCourse from './AddCourse';
import CourseDetail from './CourseDetail';
import Students from './Students';
import Analytics from './Analytics';
import Settings from './Settings';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine Title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Overview';
    if (path.includes('courses')) return 'My Courses';
    if (path.includes('students')) return 'Students';
    if (path.includes('analytics')) return 'Risk Analysis';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className={styles.dashboardLayout}>
      
      {/* Sidebar (Left Navigation) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        
        {/* Topbar (Header) */}
        <Topbar 
          onToggleSidebar={() => setIsSidebarOpen(true)} 
          title={getPageTitle()}
        />

        {/* Dynamic Page Content */}
        <div className={styles.pageContainer}>
          <Routes>
            {/* Overview */}
            <Route path="/" element={<Overview />} />
            
            {/* Course Management */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/add" element={<AddCourse />} /> 
            <Route path="/courses/:id" element={<CourseDetail />} />
            
            {/* Other Pages */}
            <Route path="/students" element={<Students />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;