import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est stocké dans le localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/citoyens/connexion', {
        email_citoyen: email,
        mot_de_passe_citoyen: password
      });

      if (response.data.success) {
        const { token, data: userData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/citoyens/inscription', {
        nom_citoyen: userData.nom,
        prenom_citoyen: userData.prenom,
        email_citoyen: userData.email,
        mot_de_passe_citoyen: userData.password,
        telephone: userData.telephone || ''
      });

      if (response.data.success) {
        const { token, data: newUserData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUserData));
        setUser(newUserData);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Erreur d\'inscription');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
