import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">CityVoice</span>
        </Link>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Accueil
          </Link>
          <Link
            to="/forum"
            className={`nav-link ${
              location.pathname === "/forum" ? "active" : ""
            }`}
          >
            Forum
          </Link>
          <Link
            to="/signalement"
            className={`nav-link ${
              location.pathname === "/signalement" ? "active" : ""
            }`}
          >
            Signalement
          </Link>
        </nav>

        <div className="header-actions">
          <button className="menu-btn">☰</button>
          {isAuthenticated ? (
            <>
              <span className="user-info">
                👤 {user?.prenom_citoyen} {user?.nom_citoyen}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/inscription" className="btn-inscription">
                Inscription
              </Link>
              <Link to="/connexion" className="btn-connexion">
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
