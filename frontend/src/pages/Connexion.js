import React, { useState } from "react";
import "./Connexion.css";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let ok = true;

    if (!email.includes("@")) {
      setEmailError("Email invalide");
      ok = false;
    }

    if (password.length < 6) {
      setPasswordError("Minimum 6 caractères");
      ok = false;
    }

    if (!ok) return;

    alert("Connexion réussie !");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🏛️</div>
          <h1>Bienvenue sur CityVoice</h1>
          <p className="login-subtitle">Connectez-vous pour signaler et suivre les problèmes urbains</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button type="button" className="forgot-password" onClick={() => alert('Fonctionnalité à venir')}>
              Mot de passe oublié ?
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>

        <div className="login-footer">
          <p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>
            Pas encore de compte ? <a href="/inscription" className="login-link">Créer un compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}
