import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    const storedUser = localStorage.getItem('user');
    
    if (storedTokens && storedUser) {
      setAuthTokens(JSON.parse(storedTokens));
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const data = response.data;
      
      setAuthTokens(data);
      setUser(data.user);
      localStorage.setItem('authTokens', JSON.stringify(data));
      localStorage.setItem('user', JSON.stringify(data.user));
      return true;
    } catch (error) {
      // THROW the error message so Login.jsx can catch it
      throw new Error(error.response?.data?.detail || "Invalid credentials");
    }
  };

  // SIGNUP
  const signup = async (formData) => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        institution: formData.institution,
        role: formData.role
      };

      await api.post('/auth/register/', payload);
      return await login(formData.email, formData.password);
      
    } catch (error) {
      // THROW specific errors
      if (error.response?.data?.email) {
        throw new Error("This email is already registered.");
      }
      throw new Error("Registration failed. Please check your details.");
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);