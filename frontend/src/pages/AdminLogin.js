import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Vérifier que l'email se termine par @cityvoice.be
    if (!email.endsWith('@cityvoice.be')) {
      setError('Accès réservé aux administrateurs CityVoice (@cityvoice.be)');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/admin/login', {
        email,
        password
      });

      if (response.data.success) {
        // Stocker le token et les infos admin
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.data));
        
        // Rediriger vers le dashboard
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>🔐 Espace Administrateur</h1>
          <p>Connectez-vous pour gérer les signalements</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cityvoice.be"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <button
            type="button"
            className="btn-back"
            onClick={() => navigate('/')}
          >
            ← Retour à l'accueil
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
