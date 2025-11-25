import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Connexion.css";

export default function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom_citoyen: "",
    prenom_citoyen: "",
    email_citoyen: "",
    mot_de_passe_citoyen: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom_citoyen.trim()) {
      newErrors.nom_citoyen = "Le nom est requis";
    }

    if (!formData.prenom_citoyen.trim()) {
      newErrors.prenom_citoyen = "Le prénom est requis";
    }

    if (!formData.email_citoyen.includes("@")) {
      newErrors.email_citoyen = "Email invalide";
    }
  
    if (formData.mot_de_passe_citoyen.length < 6) {
      newErrors.mot_de_passe_citoyen = "Minimum 6 caractères";
    }

    if (formData.mot_de_passe_citoyen !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/citoyens/inscription", {
        nom_citoyen: formData.nom_citoyen,
        prenom_citoyen: formData.prenom_citoyen,
        email_citoyen: formData.email_citoyen,
        mot_de_passe_citoyen: formData.mot_de_passe_citoyen
      });

      if (response.data.success) {
        // Stocker le token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        
        alert("Inscription réussie ! Bienvenue sur CityVoice");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Erreur lors de l'inscription. Veuillez réessayer." });
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
          <h1>Créer un compte</h1>
          <p className="login-subtitle">Rejoignez CityVoice et participez à l'amélioration de votre ville</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-banner" style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom_citoyen"
              placeholder="Votre nom"
              value={formData.nom_citoyen}
              onChange={handleChange}
            />
            {errors.nom_citoyen && <p className="error">{errors.nom_citoyen}</p>}
          </div>

          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom_citoyen"
              placeholder="Votre prénom"
              value={formData.prenom_citoyen}
              onChange={handleChange}
            />
            {errors.prenom_citoyen && <p className="error">{errors.prenom_citoyen}</p>}
          </div>

          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              name="email_citoyen"
              placeholder="votre@email.com"
              value={formData.email_citoyen}
              onChange={handleChange}
            />
            {errors.email_citoyen && <p className="error">{errors.email_citoyen}</p>}
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="mot_de_passe_citoyen"
              placeholder="••••••••"
              value={formData.mot_de_passe_citoyen}
              onChange={handleChange}
            />
            {errors.mot_de_passe_citoyen && <p className="error">{errors.mot_de_passe_citoyen}</p>}
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="login-footer">
          <p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>
            Déjà un compte ? <a href="/connexion" className="login-link">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  );
}
