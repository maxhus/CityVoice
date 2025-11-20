import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">CityVoice</span>
        </Link>

        <nav className="nav">
          <Link to="/signalement" className="nav-link">Signalement</Link>
          <Link to="/forum" className="nav-link">Forum</Link>
        </nav>

        <div className="header-actions">
          <button className="menu-btn">☰</button>
          <Link to="/inscription" className="btn-inscription">inscription</Link>
          <Link to="/connexion" className="btn-connexion">connexion</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
