<<<<<<< HEAD
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Connexion from '../pages/Connexion';
import Signup from '../pages/Signup';

=======
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Forum from "../pages/Forum";
import Connexion from "../pages/Connexion";
import Signalement from "../pages/Signalement";
>>>>>>> 97e931e1d539c817f1971f54a00bb7091a65a45f
// import Dashboard from '../pages/Dashboard';
// import ReportForm from '../pages/ReportForm';
// import MapView from '../pages/MapView';
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return user ? children : <Navigate to="/connexion" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/connexion" element={<Connexion />} />
<<<<<<< HEAD
      <Route path="/inscription" element={<Signup />} />
=======
      <Route path="/signalement" element={<Signalement />} />
>>>>>>> 97e931e1d539c817f1971f54a00bb7091a65a45f

      {/* <Route path="/inscription" element={<Register />} /> */}
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
