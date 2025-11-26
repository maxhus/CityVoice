import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ForumCard from '../components/ForumCard';
import reportService from '../services/reportService';
import api from '../config/api';
import './Forum.css';

function Forum() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [signalements, setSignalements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Catégories du forum (basées sur les catégories de signalements)
  const categories = [
    { id: 1, name: 'Voirie', icon: '🚧', color: '#FF6B6B' },
    { id: 2, name: 'Éclairage', icon: '💡', color: '#4ECDC4' },
    { id: 3, name: 'Propreté', icon: '🧹', color: '#FFE66D' },
    { id: 4, name: 'Espace vert', icon: '🌳', color: '#95E1D3' },
    { id: 5, name: 'Sécurité', icon: '🚨', color: '#AA96DA' },
    { id: 6, name: 'Transport', icon: '🚌', color: '#FFA07A' }
  ];

  useEffect(() => {
    loadSignalements();
  }, []);

  const loadSignalements = async () => {
    try {
      setLoading(true);
      const response = await reportService.getAllReports();
      
      if (response.success) {
        // Récupérer le nombre de commentaires pour chaque signalement
        const signalementsAvecCommentaires = await Promise.all(
          response.data.map(async (signalement) => {
            try {
              const commentaires = await api.get(`/commentaires/signalement/${signalement.id_signalement}`);
              return {
                ...signalement,
                nbCommentaires: commentaires.data.length
              };
            } catch (err) {
              return {
                ...signalement,
                nbCommentaires: 0
              };
            }
          })
        );
        setSignalements(signalementsAvecCommentaires);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des signalements:', err);
    } finally {
      setLoading(false);
    }
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

  // Données de test pour les discussions
  // eslint-disable-next-line no-unused-vars
  const mockDiscussions = [
    {
      id: 1,
      title: 'Amélioration de l\'éclairage public rue Victor Hugo',
      description: 'Suite au signalement d\'un lampadaire cassé, je pense qu\'on devrait revoir tout l\'éclairage de cette rue. Plusieurs zones restent très sombres le soir.',
      category: 'Améliorations',
      author: 'Marie Dupont',
      time: 'Il y a 2 heures',
      replies: 12,
      views: 234,
      likes: 28
    },
    {
      id: 2,
      title: 'Problème de circulation au carrefour Bastille',
      description: 'Le feu tricolore en panne cause de gros embouteillages. La situation devient dangereuse, surtout pour les piétons et cyclistes.',
      category: 'Problèmes urbains',
      author: 'Jean Martin',
      time: 'Il y a 5 heures',
      replies: 8,
      views: 456,
      likes: 45
    },
    {
      id: 3,
      title: 'Témoignage : Parc Monceau après l\'intervention',
      description: 'Je tenais à remercier les services municipaux pour avoir rapidement retiré l\'arbre mort. Le parc est maintenant beaucoup plus sûr pour les familles.',
      category: 'Témoignages',
      author: 'Sophie Bernard',
      time: 'Il y a 1 jour',
      replies: 15,
      views: 789,
      likes: 67
    },
    {
      id: 4,
      title: 'Idée : Installer des poubelles de tri sélectif',
      description: 'Pourquoi ne pas installer des poubelles avec tri sélectif dans tous les parcs de la ville ? Cela encouragerait le recyclage et réduirait les déchets.',
      category: 'Idées',
      author: 'Pierre Dubois',
      time: 'Il y a 2 jours',
      replies: 23,
      views: 1234,
      likes: 89
    },
    {
      id: 5,
      title: 'Question sur le délai de traitement des signalements',
      description: 'J\'ai fait un signalement il y a une semaine et il est toujours en attente. Quel est le délai moyen de traitement ?',
      category: 'Questions',
      author: 'Lucie Petit',
      time: 'Il y a 3 jours',
      replies: 6,
      views: 345,
      likes: 12
    },
    {
      id: 6,
      title: 'Multiplication des nids-de-poule dans le quartier',
      description: 'J\'ai remarqué une augmentation des nids-de-poule dans notre quartier. Plusieurs rues sont concernées. Est-ce qu\'une campagne de réparation est prévue ?',
      category: 'Problèmes urbains',
      author: 'Marc Rousseau',
      time: 'Il y a 4 jours',
      replies: 18,
      views: 567,
      likes: 34
    },
    {
      id: 7,
      title: 'Proposition : Bancs supplémentaires au Jardin du Luxembourg',
      description: 'Le jardin est très fréquenté mais manque de bancs. Il serait bien d\'en ajouter, surtout dans les zones ombragées.',
      category: 'Améliorations',
      author: 'Anne Lefebvre',
      time: 'Il y a 5 jours',
      replies: 9,
      views: 432,
      likes: 56
    }
  ];

  // Transformer les signalements en format forum
  const discussions = signalements.map(sig => ({
    id: sig.id_signalement,
    title: sig.titre,
    description: sig.description,
    category: sig.categorie,
    author: sig.citoyen ? `${sig.citoyen.prenom_citoyen} ${sig.citoyen.nom_citoyen}` : 'Anonyme',
    time: getTimeAgo(sig.date_soumission),
    replies: sig.nbCommentaires || 0,
    views: Math.floor(Math.random() * 500) + 50, // Simulé pour l'instant
    likes: Math.floor(Math.random() * 50), // Simulé pour l'instant
    statut: sig.statut
  }));

  // Filtrer les discussions selon la catégorie active
  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleDiscussionClick = (discussionId) => {
    navigate(`/signalement/${discussionId}`);
  };

  if (loading) {
    return (
      <div className="forum-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Chargement des discussions...
        </div>
      </div>
    );
  }

  return (
    <div className="forum-page">
      <Header />
      
      <div className="forum-hero">
        <div className="forum-hero-content">
          <h1 className="forum-hero-title">💬 Forum CityVoice</h1>
          <p className="forum-hero-subtitle">
            Discutez autour des signalements et partagez vos idées pour améliorer notre ville
          </p>
          <button 
            className="new-discussion-btn"
            onClick={() => navigate('/signalement')}
          >
            ✏️ Nouveau signalement
          </button>
        </div>
      </div>

      <div className="forum-container">
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="forum-stats">
          <div className="stat-box">
            <span className="stat-number">{filteredDiscussions.length}</span>
            <span className="stat-label">Discussions</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">
              {filteredDiscussions.reduce((sum, d) => sum + d.replies, 0)}
            </span>
            <span className="stat-label">Réponses</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">
              {filteredDiscussions.reduce((sum, d) => sum + d.views, 0)}
            </span>
            <span className="stat-label">Vues</span>
          </div>
        </div>

        <div className="forum-discussions">
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((discussion) => (
              <div 
                key={discussion.id} 
                onClick={() => handleDiscussionClick(discussion.id)}
                style={{ cursor: 'pointer' }}
              >
                <ForumCard discussion={discussion} />
              </div>
            ))
          ) : (
            <div className="no-discussions">
              <p>Aucune discussion dans cette catégorie pour le moment.</p>
              <button 
                className="new-discussion-btn"
                onClick={() => navigate('/signalement')}
              >
                Créer le premier signalement
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>COPYRIGHT © ___2025___</p>
        <p>DESIGNED BY MALXHUS</p>
      </footer>
    </div>
  );
}

export default Forum;
