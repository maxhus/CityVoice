const Commentaire = require('../models/Commentaire');
const Citoyen = require('../models/Citoyen');
const Signalement = require('../models/Signalement');

// Récupérer tous les commentaires d'un signalement
exports.getCommentairesBySignalement = async (req, res) => {
  try {
    const { id_signalement } = req.params;

    const commentaires = await Commentaire.findAll({
      where: { id_signalement },
      include: [
        {
          model: Citoyen,
          as: 'citoyen',
          attributes: ['id_citoyen', 'nom_citoyen', 'prenom_citoyen']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Transformer les données pour ajouter les alias
    const commentairesData = commentaires.map(c => {
      const commentaire = c.toJSON();
      if (commentaire.citoyen) {
        commentaire.citoyen.nom = commentaire.citoyen.nom_citoyen;
        commentaire.citoyen.prenom = commentaire.citoyen.prenom_citoyen;
      }
      return commentaire;
    });

    res.json(commentairesData);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouveau commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const { id_signalement, texte } = req.body;
    const id_citoyen = req.user.id; // Depuis le middleware auth

    // Vérifier que le signalement existe
    const signalement = await Signalement.findByPk(id_signalement);
    if (!signalement) {
      return res.status(404).json({ message: 'Signalement non trouvé' });
    }

    // Valider les données
    if (!texte || texte.trim().length === 0) {
      return res.status(400).json({ message: 'Le texte du commentaire est requis' });
    }

    // Créer le commentaire
    const commentaire = await Commentaire.create({
      id_signalement,
      id_citoyen,
      texte: texte.trim()
    });

    // Récupérer le commentaire avec les informations du citoyen
    const commentaireComplet = await Commentaire.findByPk(commentaire.id_commentaire, {
      include: [
        {
          model: Citoyen,
          as: 'citoyen',
          attributes: ['id_citoyen', 'nom_citoyen', 'prenom_citoyen']
        }
      ]
    });

    // Transformer les données
    const commentaireData = commentaireComplet.toJSON();
    if (commentaireData.citoyen) {
      commentaireData.citoyen.nom = commentaireData.citoyen.nom_citoyen;
      commentaireData.citoyen.prenom = commentaireData.citoyen.prenom_citoyen;
    }

    res.status(201).json(commentaireData);
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const { id_commentaire } = req.params;
    const id_citoyen = req.user.id;

    const commentaire = await Commentaire.findByPk(id_commentaire);

    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    // Vérifier que l'utilisateur est bien l'auteur du commentaire
    if (commentaire.id_citoyen !== id_citoyen) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await commentaire.destroy();
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
