import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Dashboard from '../pages/Dashboard';
// import ReportForm from '../pages/ReportForm';
// import MapView from '../pages/MapView';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      /> */}
      {/* <Route 
        path="/report/new" 
        element={
          <ProtectedRoute>
            <ReportForm />
          </ProtectedRoute>
        } 
      /> */}
      {/* <Route path="/map" element={<MapView />} /> */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
