import React from 'react';
import './ReportCard.css';

const ReportCard = ({ report }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Infrastructure': '☢️',
      'Propreté': '☢️',
      'Sécurité': '☢️',
      'default': 'ℹ️'
    };
    return icons[category] || icons.default;
  };

  return (
    <div className="report-card">
      <div className="report-header">
        <div className="report-icon">
          {getCategoryIcon(report.category)}
        </div>
        <div className="report-info">
          <h3 className="report-title">recent reports</h3>
          <p className="report-status">en cours</p>
          <span className="report-time">{report.time || '5 minutes passées'}</span>
        </div>
      </div>
      
      <div className="report-details">
        <div className="report-icon-large">ℹ️</div>
        <div className="report-content">
          <h4 className="report-subtitle">recent reports</h4>
          <p className="report-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem the industry's
          </p>
          <span className="report-time-detail">5 minutes passées</span>
        </div>
      </div>

      <div className="report-footer">
        <div className="report-meta">
          <span className="report-category">Category<br/><strong>{report.category || 'Infrastructure'}</strong></span>
          <span className="report-request">Request<br/><strong>{report.duration || 'Depuis 1 heure'}</strong></span>
        </div>
        <button className="comment-btn">comment</button>
      </div>
    </div>
  );
};

export default ReportCard;
