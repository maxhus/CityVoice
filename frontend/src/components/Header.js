import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

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
          <Link to="/inscription" className="btn-inscription">
            Inscription
          </Link>
          <Link to="/connexion" className="btn-connexion">
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
