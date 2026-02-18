import axios from 'axios';

const api = axios.create({
  // This looks for an environment variable named VITE_API_URL. 
  // If it doesn't find it (like on localhost), it defaults to your local server.
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      config.headers.Authorization = `Bearer ${parsedTokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Handle Expired Tokens (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log("Token expired or invalid. Logging out...");
      localStorage.removeItem('authTokens');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;