
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const { role, permissions } = response.data;
      localStorage.setItem('role', role);
      localStorage.setItem('permissions', JSON.stringify(permissions));
      setUser({ role, permissions });
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('permissions');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    if (role && permissions) {
      setUser({ role, permissions });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
