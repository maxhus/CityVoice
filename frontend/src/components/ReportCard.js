import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportCard.css';

const ReportCard = ({ report }) => {
  const navigate = useNavigate();
  const getCategoryIcon = (category) => {
    const icons = {
      'Infrastructure': '🏗️',
      'Voirie': '🚧',
      'Propreté': '🗑️',
      'Éclairage public': '💡',
      'Espaces verts': '🌳',
      'Transport': '🚌',
      'Mobilier urbain': '🪑',
      'Bâtiments publics': '🏛️',
      'Eau et assainissement': '💧',
      'Sécurité': '🚨',
      'Vandalisme': '⚠️',
      'Éclairage': '💡',
      'default': 'ℹ️'
    };
    return icons[category] || icons.default;
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  };

  const getStatusLabel = (status) => {
    const labels = {
      'en_attente': 'En attente',
      'En cours': 'En cours',
      'Nouveau': 'Nouveau',
      'Résolu': 'Résolu'
    };
    return labels[status] || status;
  };

  return (
    <div className="report-card">
      <div className="report-header">
        <div className="report-icon">
          {getCategoryIcon(report.category)}
        </div>
        <div className="report-info">
          <h3 className="report-title">{report.title || 'Sans titre'}</h3>
          <div className="report-meta-inline">
            <span className="badge badge-status">{getStatusLabel(report.status)}</span>
            <span className="badge badge-priority">{report.priorite || 'normale'}</span>
          </div>
        </div>
      </div>
      
      <div className="report-body">
        <p className="report-description">
          {report.description || 'Aucune description disponible'}
        </p>
        
        {(report.quartier || report.adresse) && (
          <p className="report-location">
            📍 {report.quartier || report.adresse}
          </p>
        )}
      </div>

      <div className="report-footer">
        <div className="report-meta">
          <span className="meta-item">
            <strong>{report.category}</strong>
          </span>
          <span className="meta-item">
            {getTimeAgo(report.date_soumission)}
          </span>
        </div>
        <button 
          className="comment-btn"
          onClick={() => navigate(`/signalement/${report.id_signalement}`)}
        >
          💬 Voir détails et commentaires
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
