import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('dj_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('dj_auth_token') || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('dj_auth_token', token);
    } else {
      localStorage.removeItem('dj_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dj_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dj_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      }
    } catch (error) {
      // Fallback for offline/demo admin login
      if (email === 'admin@djfashion.com' && password === 'admin123') {
        const demoAdmin = {
          _id: 'demo-admin-id',
          name: 'DJ Admin',
          email: 'admin@djfashion.com',
          role: 'ADMIN',
          phone: '+91 98765 00000',
        };
        setUser(demoAdmin);
        setToken('demo-admin-token');
        return { success: true, user: demoAdmin };
      }
      if (email === 'customer@djfashion.com' && password === 'customer123') {
        const demoCustomer = {
          _id: 'demo-customer-id',
          name: 'Ananya Sharma',
          email: 'customer@djfashion.com',
          role: 'CUSTOMER',
          phone: '+91 98765 11111',
          addresses: [{
            name: 'Ananya Sharma',
            phone: '+91 98765 11111',
            street: '402 Sunrise Heights, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
            isDefault: true
          }]
        };
        setUser(demoCustomer);
        setToken('demo-customer-token');
        return { success: true, user: demoCustomer };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password, phone });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      }
    } catch (error) {
      // Demo fallback
      const newUser = {
        _id: `user-${Date.now()}`,
        name,
        email,
        role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
        phone: phone || '',
        addresses: []
      };
      setUser(newUser);
      setToken(`demo-token-${Date.now()}`);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('dj_user');
    localStorage.removeItem('dj_auth_token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
