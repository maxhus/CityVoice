import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';

function CommentSection({ signalementId }) {
  const { user, isAuthenticated } = useAuth();
  const [commentaires, setCommentaires] = useState([]);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger les commentaires
  const chargerCommentaires = async () => {
    try {
      const response = await api.get(`/commentaires/signalement/${signalementId}`);
      setCommentaires(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires:', err);
    }
  };

  useEffect(() => {
    if (signalementId) {
      chargerCommentaires();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signalementId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nouveauCommentaire.trim()) {
      setError('Le commentaire ne peut pas être vide');
      return;
    }

    if (!isAuthenticated) {
      setError('Vous devez être connecté pour commenter');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/commentaires', {
        id_signalement: signalementId,
        texte: nouveauCommentaire.trim()
      });

      setCommentaires([response.data, ...commentaires]);
      setNouveauCommentaire('');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout du commentaire');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idCommentaire) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return;
    }

    try {
      await api.delete(`/commentaires/${idCommentaire}`);
      setCommentaires(commentaires.filter(c => c.id_commentaire !== idCommentaire));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du commentaire');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const maintenant = new Date();
    const diff = Math.floor((maintenant - date) / 1000); // différence en secondes

    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `Il y a ${Math.floor(diff / 86400)}j`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: date.getFullYear() !== maintenant.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className="comment-section">
      <h3>💬 Commentaires ({commentaires.length})</h3>

      {/* Formulaire d'ajout */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={nouveauCommentaire}
            onChange={(e) => setNouveauCommentaire(e.target.value)}
            placeholder="Ajouter un commentaire..."
            rows="3"
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading || !nouveauCommentaire.trim()}>
            {loading ? 'Envoi...' : 'Publier'}
          </button>
        </form>
      ) : (
        <p className="login-prompt">Connectez-vous pour ajouter un commentaire</p>
      )}

      {/* Liste des commentaires */}
      <div className="comments-list">
        {commentaires.length === 0 ? (
          <p className="no-comments">Aucun commentaire pour le moment</p>
        ) : (
          commentaires.map((commentaire) => (
            <div key={commentaire.id_commentaire} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">
                  {commentaire.citoyen 
                    ? `${commentaire.citoyen.prenom} ${commentaire.citoyen.nom}`
                    : 'Utilisateur supprimé'}
                </span>
                <span className="comment-date">{formatDate(commentaire.created_at)}</span>
              </div>
              <p className="comment-text">{commentaire.texte}</p>
              {user && commentaire.id_citoyen === user.id_citoyen && (
                <button 
                  className="btn-delete-comment"
                  onClick={() => handleDelete(commentaire.id_commentaire)}
                >
                  🗑️ Supprimer
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
