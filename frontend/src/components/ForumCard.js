import React from 'react';
import './ForumCard.css';

const ForumCard = ({ discussion }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Problèmes urbains': '🏙️',
      'Améliorations': '💡',
      'Témoignages': '💬',
      'Idées': '🌟',
      'Questions': '❓',
      'default': '📋'
    };
    return icons[category] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Problèmes urbains': '#FF6B6B',
      'Améliorations': '#4ECDC4',
      'Témoignages': '#FFE66D',
      'Idées': '#95E1D3',
      'Questions': '#AA96DA',
      'default': '#999'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="forum-card">
      <div className="forum-card-header">
        <div 
          className="forum-category-badge" 
          style={{ backgroundColor: getCategoryColor(discussion.category) }}
        >
          <span className="category-icon">{getCategoryIcon(discussion.category)}</span>
          <span className="category-name">{discussion.category}</span>
        </div>
        <span className="forum-time">{discussion.time}</span>
      </div>

      <h3 className="forum-title">{discussion.title}</h3>
      <p className="forum-description">{discussion.description}</p>

      <div className="forum-card-footer">
        <div className="forum-author">
          <div className="author-avatar">
            {discussion.author.charAt(0).toUpperCase()}
          </div>
          <span className="author-name">{discussion.author}</span>
        </div>

        <div className="forum-stats">
          <span className="stat-item">
            💬 {discussion.replies || 0} réponses
          </span>
          <span className="stat-item">
            👁️ {discussion.views || 0} vues
          </span>
          <span className="stat-item">
            👍 {discussion.likes || 0} j'aime
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
