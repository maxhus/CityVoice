import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './SignalementDetails.css';
import CommentSection from '../components/CommentSection';
import api from '../config/api';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function SignalementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [signalement, setSignalement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    chargerSignalement();
  }, [id]);

  const chargerSignalement = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/signalements/${id}`);
      setSignalement(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement du signalement:', err);
      setError('Impossible de charger le signalement');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categorie) => {
    const icons = {
      'voirie': '🚧',
      'eclairage': '💡',
      'proprete': '🧹',
      'espace-vert': '🌳',
      'securite': '🚨',
      'autre': '📋'
    };
    return icons[categorie] || '📋';
  };

  const getStatusBadge = (statut) => {
    const config = {
      'en_attente': { label: 'En attente', class: 'status-pending' },
      'en_cours': { label: 'En cours', class: 'status-progress' },
      'resolu': { label: 'Résolu', class: 'status-resolved' },
      'rejete': { label: 'Rejeté', class: 'status-rejected' }
    };
    const { label, class: className } = config[statut] || config['en_attente'];
    return <span className={`status-badge ${className}`}>{label}</span>;
  };

  const getPriorityBadge = (priorite) => {
    const config = {
      'faible': { label: 'Faible', class: 'priority-low' },
      'normale': { label: 'Normale', class: 'priority-normal' },
      'elevee': { label: 'Élevée', class: 'priority-high' },
      'urgente': { label: 'Urgente', class: 'priority-urgent' }
    };
    const { label, class: className } = config[priorite] || config['normale'];
    return <span className={`priority-badge ${className}`}>{label}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error || !signalement) {
    return (
      <div className="error-container">
        <p>{error || 'Signalement non trouvé'}</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="signalement-details-page">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="signalement-details-card">
        {/* En-tête */}
        <div className="details-header">
          <div className="header-left">
            <span className="category-icon">{getCategoryIcon(signalement.categorie)}</span>
            <h1>{signalement.titre}</h1>
          </div>
          <div className="header-right">
            {getStatusBadge(signalement.statut)}
            {getPriorityBadge(signalement.priorite)}
          </div>
        </div>

        {/* Informations principales */}
        <div className="details-info">
          <div className="info-group">
            <span className="info-label">📅 Date de soumission</span>
            <span className="info-value">{formatDate(signalement.date_soumission)}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">📍 Adresse</span>
            <span className="info-value">{signalement.adresse || 'Non renseignée'}</span>
          </div>

          <div className="info-group">
            <span className="info-label">🏘️ Quartier</span>
            <span className="info-value">{signalement.quartier || 'Non renseigné'}</span>
          </div>

          {signalement.citoyen && (
            <div className="info-group">
              <span className="info-label">👤 Signalé par</span>
              <span className="info-value">
                {signalement.citoyen.prenom} {signalement.citoyen.nom}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="details-description">
          <h2>📝 Description</h2>
          <p>{signalement.description}</p>
        </div>

        {/* Carte si coordonnées disponibles */}
        {signalement.latitude && signalement.longitude && (
          <div className="details-map">
            <h2>📍 Localisation</h2>
            <div className="map-container">
              <MapContainer
                center={[parseFloat(signalement.latitude), parseFloat(signalement.longitude)]}
                zoom={15}
                style={{ height: '400px', width: '100%', borderRadius: '8px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[parseFloat(signalement.latitude), parseFloat(signalement.longitude)]}>
                  <Popup>
                    <strong>{signalement.titre}</strong>
                    <br />
                    {signalement.adresse || 'Adresse non renseignée'}
                  </Popup>
                </Marker>
              </MapContainer>
              <p className="map-coordinates">
                📍 Coordonnées : {parseFloat(signalement.latitude).toFixed(6)}, {parseFloat(signalement.longitude).toFixed(6)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section commentaires */}
      <CommentSection signalementId={signalement.id_signalement} />
    </div>
  );
}

export default SignalementDetails;
