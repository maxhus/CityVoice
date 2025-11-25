import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Connexion.css";

export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

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

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/citoyens/connexion", {
        email_citoyen: email,
        mot_de_passe_citoyen: password
      });

      if (response.data.success) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        
        alert("Connexion réussie !");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError("Erreur de connexion. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          ←
        </button>
        <div className="login-header">
          <div className="login-logo">🏛️</div>
          <h1>Bienvenue sur CityVoice</h1>
          <p className="login-subtitle">Connectez-vous pour signaler et suivre les problèmes urbains</p>
        </div>

        <form onSubmit={handleSubmit}>
          {generalError && (
            <div className="error-banner" style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {generalError}
            </div>
          )}

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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
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
