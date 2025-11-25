import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Forum from "../pages/Forum";
import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import Signalement from "../pages/Signalement";
// import Dashboard from '../pages/Dashboard';
// import ReportForm from '../pages/ReportForm';
// import MapView from '../pages/MapView';
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   return user ? children : <Navigate to="/connexion" />;
// };

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/signalement" element={<Signalement />} />
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