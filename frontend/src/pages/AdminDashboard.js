import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [signalements, setSignalements] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

  useEffect(() => {
    // Vérifier si l'admin est connecté
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [signalementsRes, statsRes] = await Promise.all([
        api.get('/signalements?limit=100'),
        api.get('/signalements/stats')
      ]);

      setSignalements(signalementsRes.data.data || []);
      
      // Les stats viennent directement (plus dans data)
      if (statsRes.data.success) {
        setStats({
          total: statsRes.data.total,
          parStatut: statsRes.data.parStatut,
          parCategorie: statsRes.data.parCategorie
        });
      } else {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Erreur chargement:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/signalements/${id}`, { statut: newStatus });
      loadData(); // Recharger les données
    } catch (err) {
      console.error('Erreur changement statut:', err);
      alert('Erreur lors du changement de statut');
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      await api.put(`/signalements/${id}`, { priorite: newPriority });
      loadData();
    } catch (err) {
      console.error('Erreur changement priorité:', err);
      alert('Erreur lors du changement de priorité');
    }
  };

  const filteredSignalements = filter === 'tous'
    ? signalements
    : signalements.filter(s => s.statut === filter);

  const getStatusBadge = (statut) => {
    const config = {
      'en_attente': { label: 'En attente', class: 'status-pending' },
      'en_cours': { label: 'En cours', class: 'status-progress' },
      'resolu': { label: 'Résolu', class: 'status-resolved' },
      'rejete': { label: 'Rejeté', class: 'status-rejected' }
    };
    const { label, class: className } = config[statut] || config['en_attente'];
    return <span className={`badge ${className}`}>{label}</span>;
  };

  const getPriorityBadge = (priorite) => {
    const config = {
      'faible': { label: 'Faible', class: 'priority-low' },
      'normale': { label: 'Normale', class: 'priority-normal' },
      'elevee': { label: 'Élevée', class: 'priority-high' },
      'urgente': { label: 'Urgente', class: 'priority-urgent' }
    };
    const { label, class: className } = config[priorite] || config['normale'];
    return <span className={`badge ${className}`}>{label}</span>;
  };

  if (loading) {
    return <div className="loading-container">Chargement...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🛠️ Dashboard Administrateur</h1>
          <div className="admin-user-info">
            <span>Bonjour, {adminData.prenom} {adminData.nom}</span>
            <button onClick={() => navigate('/')} className="btn-home">
              🏠 Accueil
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.total || 0}</h3>
              <p>Total signalements</p>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{stats.parStatut?.en_attente || 0}</h3>
              <p>En attente</p>
            </div>
          </div>
          <div className="stat-card stat-progress">
            <div className="stat-icon">⚙️</div>
            <div className="stat-content">
              <h3>{stats.parStatut?.en_cours || 0}</h3>
              <p>En cours</p>
            </div>
          </div>
          <div className="stat-card stat-resolved">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.parStatut?.resolu || 0}</h3>
              <p>Résolus</p>
            </div>
          </div>
          <div className="stat-card stat-rejected">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>{stats.parStatut?.rejete || 0}</h3>
              <p>Rejetés</p>
            </div>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="filters">
        <button
          className={`filter-btn ${filter === 'tous' ? 'active' : ''}`}
          onClick={() => setFilter('tous')}
        >
          Tous ({signalements.length})
        </button>
        <button
          className={`filter-btn ${filter === 'en_attente' ? 'active' : ''}`}
          onClick={() => setFilter('en_attente')}
        >
          En attente
        </button>
        <button
          className={`filter-btn ${filter === 'en_cours' ? 'active' : ''}`}
          onClick={() => setFilter('en_cours')}
        >
          En cours
        </button>
        <button
          className={`filter-btn ${filter === 'resolu' ? 'active' : ''}`}
          onClick={() => setFilter('resolu')}
        >
          Résolus
        </button>
        <button
          className={`filter-btn ${filter === 'rejete' ? 'active' : ''}`}
          onClick={() => setFilter('rejete')}
        >
          Rejetés
        </button>
      </div>

      {/* Liste des signalements */}
      <div className="signalements-list">
        {filteredSignalements.length === 0 ? (
          <p className="no-data">Aucun signalement à afficher</p>
        ) : (
          filteredSignalements.map((sig) => (
            <div key={sig.id_signalement} className="signalement-card">
              <div className="signalement-header">
                <div>
                  <h3>{sig.titre}</h3>
                  <p className="signalement-meta">
                    {sig.categorie} • {sig.quartier || 'Non renseigné'}
                  </p>
                </div>
                <div className="signalement-badges">
                  {getStatusBadge(sig.statut)}
                  {getPriorityBadge(sig.priorite)}
                </div>
              </div>

              <p className="signalement-description">{sig.description}</p>

              <div className="signalement-actions">
                <select
                  value={sig.statut}
                  onChange={(e) => handleStatusChange(sig.id_signalement, e.target.value)}
                  className="select-status"
                >
                  <option value="en_attente">En attente</option>
                  <option value="en_cours">En cours</option>
                  <option value="resolu">Résolu</option>
                  <option value="rejete">Rejeté</option>
                </select>

                <select
                  value={sig.priorite}
                  onChange={(e) => handlePriorityChange(sig.id_signalement, e.target.value)}
                  className="select-priority"
                >
                  <option value="faible">Faible</option>
                  <option value="normale">Normale</option>
                  <option value="elevee">Élevée</option>
                  <option value="urgente">Urgente</option>
                </select>

                <button
                  onClick={() => navigate(`/signalement/${sig.id_signalement}`)}
                  className="btn-view"
                >
                  👁️ Voir détails
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
