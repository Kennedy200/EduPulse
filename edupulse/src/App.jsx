import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; // Import Toaster

import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login'; 
import SignUp from './pages/SignUp/SignUp'; 
import Dashboard from './pages/Dashboard/Dashboard'; 

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Put the Toaster here with custom styles */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
            },
            success: {
              style: {
                background: '#0F172A', // Dark Navy
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#EF4444', // Red
                color: '#fff',
              },
            },
          }}
        />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;